import * as BibTeXParser from '@retorquere/bibtex-parser';
import * as fs from 'fs';
import * as path from 'path';

export interface ParsedReference {
  id: string;
  type: string;
  authors: string;
  year: string;
  title: string;
  source: string;
  doi?: string;
  url?: string;
  abstract?: string;
  keywords?: string[];
  volume?: string;
  number?: string;
  pages?: string;
  publisher?: string;
}

function formatAuthorsAPA(authorField: string): string {
  if (!authorField) return '';
  
  const authors = authorField.split(' and ').map(author => {
    author = author.trim();
    if (author.includes(',')) {
      const [lastName, firstName] = author.split(',').map(s => s.trim());
      const initials = firstName
        .split(/\s+/)
        .map(name => name.charAt(0).toUpperCase() + '.')
        .join(' ');
      return `${lastName}, ${initials}`;
    } else {
      const parts = author.split(/\s+/);
      if (parts.length > 1) {
        const lastName = parts[parts.length - 1];
        const initials = parts.slice(0, -1)
          .map(name => name.charAt(0).toUpperCase() + '.')
          .join(' ');
        return `${lastName}, ${initials}`;
      }
      return author;
    }
  });

  if (authors.length === 1) {
    return authors[0];
  } else if (authors.length === 2) {
    return `${authors[0]} & ${authors[1]}`;
  } else if (authors.length <= 20) {
    return authors.slice(0, -1).join(', ') + ', & ' + authors[authors.length - 1];
  } else {
    return authors.slice(0, 19).join(', ') + ', ... ' + authors[authors.length - 1];
  }
}

function cleanBraces(text: string): string {
  if (!text) return '';
  return text.replace(/[{}]/g, '').trim();
}

function formatCreatorName(creator: any): string {
  if (!creator || typeof creator !== 'object') return '';
  
  if (creator.name) return creator.name;
  
  const parts: string[] = [];
  if (creator.firstName) parts.push(creator.firstName);
  if (creator.prefix) parts.push(creator.prefix);
  if (creator.lastName) parts.push(creator.lastName);
  
  if (parts.length > 0) return parts.join(' ');
  
  return '';
}

function getFieldValue(entry: any, fieldName: string, debug = false): string {
  const field = entry.fields?.[fieldName];
  if (!field) return '';
  
  if (Array.isArray(field)) {
    if (fieldName === 'author') {
      const names = field.map(f => formatCreatorName(f)).filter(Boolean);
      return names.join(' and ');
    }
    
    return field.map(f => {
      if (typeof f === 'string') return f;
      if (typeof f === 'object') {
        return f.value || f.text || f.literal || '';
      }
      return String(f);
    }).join(' ');
  }
  if (typeof field === 'object' && field !== null) {
    if (fieldName === 'author') {
      return formatCreatorName(field);
    }
    return field.value || field.text || field.literal || '';
  }
  return String(field);
}

function buildSource(entry: any): string {
  const type = entry.type?.toLowerCase() || '';
  const journal = cleanBraces(getFieldValue(entry, 'journal'));
  const booktitle = cleanBraces(getFieldValue(entry, 'booktitle'));
  const publisher = cleanBraces(getFieldValue(entry, 'publisher'));
  const volume = getFieldValue(entry, 'volume');
  const number = getFieldValue(entry, 'number');
  const pages = cleanBraces(getFieldValue(entry, 'pages'));
  const edition = cleanBraces(getFieldValue(entry, 'edition'));
  const address = cleanBraces(getFieldValue(entry, 'address'));

  let source = '';

  if (type === 'article' && journal) {
    source = journal;
    if (volume) {
      source += `, ${volume}`;
      if (number) source += `(${number})`;
    }
    if (pages && !pages.includes('pages')) {
      source += `, ${pages}`;
    }
  } else if ((type === 'book' || type === 'inbook') && publisher) {
    if (edition) {
      source = `(${edition}). `;
    }
    if (address) {
      source += `${address}: `;
    }
    source += publisher;
  } else if (type === 'inproceedings' && booktitle) {
    source = `In ${booktitle}`;
    if (pages && !pages.includes('pages')) {
      source += ` (pp. ${pages})`;
    }
    if (publisher) {
      source += `. ${publisher}`;
    }
  } else if (type === 'misc') {
    source = publisher || '';
  } else if (type === 'incollection' || type === 'inbook') {
    if (booktitle) {
      source = `In ${booktitle}`;
      if (pages && !pages.includes('pages')) {
        source += ` (pp. ${pages})`;
      }
    }
    if (publisher) {
      source += `. ${publisher}`;
    }
  } else {
    source = journal || booktitle || publisher || '';
  }

  return source;
}

function getCreators(entry: any): string {
  if (entry.creators) {
    const authors = entry.creators
      .filter((c: any) => c.creatorType === 'author' || !c.creatorType)
      .map((c: any) => {
        if (c.name) return c.name;
        if (c.lastName && c.firstName) return `${c.firstName} ${c.lastName}`;
        if (c.lastName) return c.lastName;
        return '';
      })
      .filter(Boolean);
    if (authors.length > 0) return authors.join(' and ');
  }
  return '';
}

export function parseBibTeX(bibtexContent: string): ParsedReference[] {
  try {
    const parsed = BibTeXParser.parse(bibtexContent);
    
    const references: ParsedReference[] = [];
    
    for (const entry of parsed.entries) {
      let authors = cleanBraces(getFieldValue(entry, 'author'));
      
      if (!authors) {
        authors = getCreators(entry);
      }
      
      const title = cleanBraces(getFieldValue(entry, 'title'));
      const year = getFieldValue(entry, 'year') || '';
      
      if (!authors && !title) continue;

      const ref: ParsedReference = {
        id: entry.key || `ref-${references.length + 1}`,
        type: entry.type || 'misc',
        authors: formatAuthorsAPA(authors),
        year: year.replace(/[{}]/g, ''),
        title: title,
        source: buildSource(entry),
        doi: getFieldValue(entry, 'doi'),
        url: cleanBraces(getFieldValue(entry, 'url')),
        abstract: cleanBraces(getFieldValue(entry, 'abstract')),
        volume: getFieldValue(entry, 'volume'),
        number: getFieldValue(entry, 'number'),
        pages: cleanBraces(getFieldValue(entry, 'pages')),
        publisher: cleanBraces(getFieldValue(entry, 'publisher')),
      };

      const keywordsStr = getFieldValue(entry, 'keywords');
      if (keywordsStr) {
        ref.keywords = keywordsStr.split(/[;,]/).map(k => k.trim()).filter(k => k);
      }

      references.push(ref);
    }

    return references;
  } catch (error) {
    console.error('Error parsing BibTeX:', error);
    return [];
  }
}

export function formatReferenceAPA(ref: ParsedReference): string {
  let citation = '';
  
  if (ref.authors) {
    citation += ref.authors;
  }
  
  if (ref.year) {
    citation += ` (${ref.year}).`;
  }
  
  if (ref.title) {
    if (ref.type === 'book' || ref.type === 'inbook') {
      citation += ` *${ref.title}*.`;
    } else {
      citation += ` ${ref.title}.`;
    }
  }
  
  if (ref.source) {
    if (ref.type === 'article') {
      citation += ` *${ref.source}*.`;
    } else {
      citation += ` ${ref.source}.`;
    }
  }
  
  if (ref.doi) {
    const doiUrl = ref.doi.startsWith('http') ? ref.doi : `https://doi.org/${ref.doi}`;
    citation += ` ${doiUrl}`;
  } else if (ref.url) {
    citation += ` ${ref.url}`;
  }
  
  return citation.trim();
}

export function formatInTextCitation(ref: ParsedReference, includeYear: boolean = true): string {
  if (!ref.authors) return '';
  
  const authorStr = ref.authors;
  
  const authorParts = authorStr.split(/,\s*&\s*|\s*&\s*/).map(a => a.split(',')[0].trim()).filter(Boolean);
  
  let citation = '';
  if (authorParts.length === 0) {
    citation = authorStr.split(',')[0].trim() || authorStr;
  } else if (authorParts.length === 1) {
    citation = authorParts[0];
  } else if (authorParts.length === 2) {
    citation = `${authorParts[0]} & ${authorParts[1]}`;
  } else {
    citation = `${authorParts[0]} et al.`;
  }
  
  if (includeYear && ref.year) {
    citation += `, ${ref.year}`;
  }
  
  return citation;
}

let cachedReferences: ParsedReference[] | null = null;

export function loadDefaultReferences(): ParsedReference[] {
  if (cachedReferences) return cachedReferences;
  
  try {
    const bibPath = path.join(process.cwd(), 'attached_assets', 'export_1769137214812.bib');
    if (fs.existsSync(bibPath)) {
      const content = fs.readFileSync(bibPath, 'utf-8');
      cachedReferences = parseBibTeX(content);
      console.log(`Loaded ${cachedReferences.length} references from BibTeX file`);
      return cachedReferences;
    }
  } catch (error) {
    console.error('Error loading default references:', error);
  }
  
  return [];
}

export function searchReferences(query: string, references: ParsedReference[]): ParsedReference[] {
  const queryLower = query.toLowerCase();
  const terms = queryLower.split(/\s+/).filter(t => t.length > 2);
  
  return references.filter(ref => {
    const searchableText = [
      ref.authors,
      ref.title,
      ref.abstract || '',
      ref.keywords?.join(' ') || '',
      ref.year
    ].join(' ').toLowerCase();
    
    return terms.some(term => searchableText.includes(term));
  }).slice(0, 20);
}

export function clearReferenceCache(): void {
  cachedReferences = null;
}
