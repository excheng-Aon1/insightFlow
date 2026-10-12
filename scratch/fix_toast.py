with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add import
if "react-hot-toast" not in content:
    content = content.replace("import { jwtDecode } from 'jwt-decode';", "import { jwtDecode } from 'jwt-decode';\nimport { Toaster, toast } from 'react-hot-toast';")

# 2. Add Toaster component inside the main container
if "<Toaster" not in content:
    content = content.replace("""    <div className={`min-h-screen font-sans transition-colors duration-500 ${theme === 'dark' ? 'bg-[#040814] text-slate-300' : 'bg-slate-50 text-slate-600'}`}>""",
"""    <div className={`min-h-screen font-sans transition-colors duration-500 ${theme === 'dark' ? 'bg-[#040814] text-slate-300' : 'bg-slate-50 text-slate-600'}`}>
      <Toaster position="top-right" />""")

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
