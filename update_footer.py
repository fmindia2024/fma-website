import os
import glob

# The exact string to find (based on previous grep output/view_file)
full_tag_search = 'class="navigation-grid" style="grid-template-columns: repeat(4, auto) 1fr; align-items: center; gap: 40px; margin-bottom: 60px;"'
full_tag_replace = 'class="navigation-grid footer-nav-responsive"'

# Also handle the variant with newlines if formatted differently, though grep matched exact line.
# Let's try flexible reading.

files = glob.glob("*.html")

for file_path in files:
    with open(file_path, 'r') as f:
        content = f.read()
    
    # We also need to handle cases where formatting might differ slightly (spaces etc)
    # But for now let's try strict replacement as grep found it
    
    if 'grid-template-columns: repeat(4, auto) 1fr' in content:
        # Check standard format
        new_content = content.replace(full_tag_search, full_tag_replace)
        
        # Fallback if specific formatting differs but unique style key exists
        if new_content == content:
             # Try simpler replacement of style attribute content if class matches
             # This is risky with regex without careful boundaries.
             # Let's try to match the style string specifically
             style_string = 'style="grid-template-columns: repeat(4, auto) 1fr; align-items: center; gap: 40px; margin-bottom: 60px;"'
             if style_string in content:
                 new_content = content.replace(style_string, '')
                 new_content = new_content.replace('class="navigation-grid"', 'class="navigation-grid footer-nav-responsive"')
        
        if new_content != content:
            print(f"Updating {file_path}")
            with open(file_path, 'w') as f:
                f.write(new_content)
        else:
            print(f"Skipping {file_path} (Pattern not exact match)")
    else:
        print(f"Skipping {file_path} (Not found)")

