import os

target_files = [
    "index.html",
    "projects.html",
    "about.html",
    "contact.html",
    "blogs.html",
    "blog_detail.html",
    "blog_detail_2.html",
    "blog_detail_3.html",
    "blog_detail_4.html",
    "detail_project.html"
]

preloader_html = """
    <!-- Global Preloader -->
    <div id="global-preloader">
        <div class="loader-content">
            <div class="loader-logo">FMA.</div>
            <div class="loader-line-mask">
                <div class="loader-line"></div>
            </div>
        </div>
    </div>
"""

css_link = '<link href="css/global-animations.css" rel="stylesheet" type="text/css">'

scripts_html = """
    <!-- Global Scroll & Animation Scripts -->
    <script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <script src="js/global-scroll.js"></script>
"""

for filename in target_files:
    if not os.path.exists(filename):
        print(f"Skipping {filename} (not found)")
        continue
        
    print(f"Processing {filename}...")
    with open(filename, 'r') as f:
        content = f.read()

    # 1. Inject CSS in Head
    if css_link not in content:
        if "</head>" in content:
            content = content.replace("</head>", f"{css_link}\n</head>")
        else:
            print(f"Warning: No </head> in {filename}")

    # 2. Inject Preloader at Body Start
    if 'id="global-preloader"' not in content:
        if "<body" in content:
            # Find the opening body tag (handling attributes)
            import re
            body_match = re.search(r"<body[^>]*>", content)
            if body_match:
                end_idx = body_match.end()
                content = content[:end_idx] + preloader_html + content[end_idx:]

    # 3. Inject Scripts at Body End
    if "js/global-scroll.js" not in content:
        if "</body>" in content:
            content = content.replace("</body>", f"{scripts_html}\n</body>")
        else:
            print(f"Warning: No </body> in {filename}")

    with open(filename, 'w') as f:
        f.write(content)

print("Global animations applied successfully.")
