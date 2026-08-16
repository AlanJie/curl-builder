"""
Script to fetch the latest official cURL documentation,
regenerate the flag registry, and rebuild the standalone bundle.
"""

import urllib.request
import subprocess
import sys
import os

DOCS_URL = "https://curl.se/docs/manpage.html"
OUTPUT_HTML = "manpage.html"

def fetch_docs():
    print(f"Fetching latest cURL manpage from {DOCS_URL}...")
    req = urllib.request.Request(
        DOCS_URL,
        headers={"User-Agent": "cURL-Builder-AutoUpdater/1.0"}
    )
    with urllib.request.urlopen(req) as response:
        content = response.read().decode('utf-8')
    
    with open(OUTPUT_HTML, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Saved to {OUTPUT_HTML} ({len(content)} bytes).")

def regenerate_flags():
    print("Regenerating cURL flags metadata registry...")
    subprocess.run([sys.executable, "generate_flags_data.py"], check=True)

def build_standalone():
    print("Building standalone HTML bundle...")
    try:
        subprocess.run(["node", "build-standalone.js"], check=True)
    except Exception as e:
        print(f"Node build standalone warning/error: {e}")

if __name__ == "__main__":
    fetch_docs()
    regenerate_flags()
    build_standalone()
    print("Update complete.")
