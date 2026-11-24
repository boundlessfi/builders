/** Open absolute web links in a new tab while keeping local routes in this tab. */
export function externalLinkProps(href: string) {
  return href.startsWith('http')
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};
}
