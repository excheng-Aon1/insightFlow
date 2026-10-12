with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add to unauthenticated return
target_1 = '<div className="min-h-screen bg-[#050814] text-slate-100 flex flex-col font-sans select-none relative">'
if target_1 in content and "<Toaster" not in content:
    content = content.replace(target_1, target_1 + '\n        <Toaster position="top-right" />')

# Add to authenticated return
target_2 = """    <div className={`min-h-screen flex font-sans select-none transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#030712] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>"""
if target_2 in content:
    content = content.replace(target_2, target_2 + '\n      <Toaster position="top-right" />')

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
