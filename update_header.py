import os
import glob
import re

# Correct navigation block
correct_nav = """<nav role="navigation" class="nav-menu w-nav-menu">
                                <a href="projects.html" data-wf--nav-item--variant="small"
                                    class="navigation-link w-inline-block">
                                    <div class="nav-text first">Projects</div>
                                    <div class="nav-text second">Projects</div>
                                </a>
                                <a href="about.html" data-wf--nav-item--variant="small"
                                    class="navigation-link w-inline-block">
                                    <div class="nav-text first">About Us</div>
                                    <div class="nav-text second">About Us</div>
                                </a>
                                <a href="blogs.html" data-wf--nav-item--variant="small"
                                    class="navigation-link w-inline-block">
                                    <div class="nav-text first">Blogs</div>
                                    <div class="nav-text second">Blogs</div>
                                </a>
                                <a href="contact.html" data-wf--nav-item--variant="small"
                                    class="navigation-link w-inline-block">
                                    <div class="nav-text first">
                                        <img src="images/whatsapp-2.png" width="16"
                                            style="vertical-align: middle; margin-bottom: 3px; margin-right: 4px;"
                                            alt=""> Contact Us
                                    </div>
                                    <div class="nav-text second">
                                        <img src="images/whatsapp-2.png" width="16"
                                            style="vertical-align: middle; margin-bottom: 3px; margin-right: 4px;"
                                            alt=""> Contact Us
                                    </div>
                                </a>
                            </nav>"""

# Regex to find the existing nav-menu block
# Matches <nav role="navigation" class="nav-menu w-nav-menu"> ... </nav>
regex = re.compile(r'<nav role="navigation" class="nav-menu w-nav-menu">.*?</nav>', re.DOTALL)

files = glob.glob("blog_detail*.html")

for file_path in files:
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Replace the regex match with the correct nav
    if regex.search(content):
        new_content = regex.sub(correct_nav, content)
        
        # Also ensure "Home" link is removed or replaced if it was outside standard nav or handled differently
        # The provided snippet essentially replaces the inner list.
        # Note: The Home link in the original files was pointing to index.html with text "Home"
        
        if new_content != content:
            print(f"Updating {file_path}")
            with open(file_path, 'w') as f:
                f.write(new_content)
        else:
             print(f"No changes for {file_path}")
    else:
        print(f"Nav block not found in {file_path}")

