with open('src/App.jsx', 'r') as f:
    content = f.read()

content = content.replace("""                  </table>
                </div>
            </div>
          )}

          {/* TAB: บทวิเคราะห์ AI (INSIGHTS) */}""", """                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: บทวิเคราะห์ AI (INSIGHTS) */}""")

with open('src/App.jsx', 'w') as f:
    f.write(content)
