from pathlib import Path
from html.parser import HTMLParser
import re
ROOT=Path(__file__).resolve().parents[1]
class Inspector(HTMLParser):
    def __init__(self): super().__init__();self.ids=set();self.links=[];self.scripts=[];self.styles=[];self.buttons=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:
            assert a['id'] not in self.ids, f'Duplicate ID: {a["id"]}'
            self.ids.add(a['id'])
        if tag=='a' and 'href' in a:self.links.append(a['href'])
        if tag=='script' and 'src' in a:self.scripts.append(a['src'])
        if tag=='link' and a.get('rel')=='stylesheet':self.styles.append(a.get('href'))
        if tag=='button':self.buttons.append(a)
p=Inspector();html=(ROOT/'index.html').read_text();p.feed(html)
for link in p.links:
    if link.startswith('#'):assert link[1:] in p.ids, f'Broken anchor: {link}'
for asset in p.scripts+p.styles:
    assert (ROOT/asset).is_file(),f'Missing asset: {asset}'
css=(ROOT/'css/styles.css').read_text();js=(ROOT/'js/app.js').read_text()
for query in ['max-width:768px','max-width:1024px','min-width:1025px','prefers-reduced-motion']:
    assert query in css, f'Missing CSS feature: {query}'
for section in ['about','work','contact','project-dialog','contact-form','nav-links']:
    assert section in p.ids, f'Missing section: {section}'
for token in ['showModal()','reportValidity()','aria-expanded','mailto:']:
    assert token in js or token in html, f'Missing UI feature: {token}'
assert len(re.findall(r'data-project="\d+"',html))==4
print('PASS: HTML parsed, anchors resolved, assets present, breakpoints and accessibility features found, 4 projects and interactive components verified.')
print('NOTE: This static smoke test does not replace browser testing of visual layout or interactions.')
