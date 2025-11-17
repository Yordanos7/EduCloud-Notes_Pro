// Quick script to encode your database password for the connection string

const password = "yordi@0721";
const encoded = encodeURIComponent(password);

console.log("\n===========================================");
console.log("DATABASE PASSWORD ENCODER");
console.log("===========================================\n");
console.log("Your password:", password);
console.log("Encoded password:", encoded);
console.log("\n===========================================");
console.log("USE THIS IN YOUR CONNECTION STRING:");
console.log("===========================================\n");

// Example connection string
const exampleUrl = `postgresql://postgres.lvemllffjyhxeziucakd:${encoded}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`;
console.log(exampleUrl);
console.log("\n");
