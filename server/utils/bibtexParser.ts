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

function getFieldValue(entry: any, fieldName: string): string {
  const field = entry.fields?.[fieldName];
  if (!field) return '';
  if (Array.isArray(field)) {
    return field.map(f => typeof f === 'object' ? f.value || '' : f).join(' ');
  }
  if (typeof field === 'object') {
    return field.value || '';
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

export function parseBibTeX(bibtexContent: string): ParsedReference[] {
  try {
    const parsed = BibTeXParser.parse(bibtexContent, { 
      errorHandler: (err) => console.warn('BibTeX parse warning:', err) 
    });
    
    const references: ParsedReference[] = [];
    
    for (const entry of parsed.entries) {
      const authors = cleanBraces(getFieldValue(entry, 'author'));
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
  
  const firstAuthor = ref.authors.split(',')[0].trim();
  const authorCount = ref.authors.split('&').length + (ref.authors.includes(',') ? ref.authors.split(',').length - 1 : 0);
  
  let citation = '';
  if (authorCount === 1) {
    citation = firstAuthor;
  } else if (authorCount === 2) {
    const parts = ref.authors.split('&');
    citation = `${parts[0].split(',')[0].trim()} & ${parts[1].split(',')[0].trim()}`;
  } else {
    citation = `${firstAuthor} et al.`;
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
