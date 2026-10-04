// ═══════════════════════════════════════════════════════
//  Script: ساخت bcrypt hash برای رمز عبور
//  استفاده:
//    node scripts/hash-password.js "MyPassword123"
// ═══════════════════════════════════════════════════════

const bcrypt = require("bcryptjs");

const password = process.argv[2];

if (!password) {
  console.error("❌ Usage: node scripts/hash-password.js <password>");
  process.exit(1);
}

if (password.length < 8) {
  console.error("❌ رمز عبور باید حداقل ۸ کاراکتر باشد.");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
console.log("");
console.log("✅ Bcrypt hash:");
console.log(hash);
console.log("");
console.log("این hash رو توی ADMIN_USERS بذارید.");