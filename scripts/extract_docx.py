#!/usr/bin/env python3
import zipfile
import xml.etree.ElementTree as ET
import sys
from pathlib import Path

_p = Path(__file__).resolve()
candidates = [
    _p.parents[1] / 'UnityHub_UI_Audit.docx',
    _p.parents[2] / 'UnityHub_UI_Audit.docx' if len(_p.parents) > 2 else None,
    Path.cwd() / 'UnityHub_UI_Audit.docx'
]
DOCX = None
for c in candidates:
    if c and c.exists():
        DOCX = c
        break
if DOCX is None:
    # fallback to looking at the downloads folder if available
    DOCX = Path(__file__).resolve().parents[3].joinpath('UnityHub_UI_Audit.docx') if len(Path(__file__).resolve().parents) > 3 else Path('UnityHub_UI_Audit.docx')

def extract_text(docx_path):
    if not docx_path.exists():
        print('Docx file not found:', docx_path)
        return 1
    try:
        with zipfile.ZipFile(docx_path, 'r') as z:
            xml = z.read('word/document.xml')
    except Exception as e:
        print('Error reading docx:', e)
        return 2
    try:
        root = ET.fromstring(xml)
    except Exception as e:
        print('Error parsing XML:', e)
        return 3
    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    texts = []
    for node in root.iter():
        if node.tag.endswith('}t') and node.text:
            texts.append(node.text)
    out = '\n'.join(texts)
    print(out)
    return 0

if __name__ == '__main__':
    sys.exit(extract_text(DOCX))
