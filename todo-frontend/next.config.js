/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 🔹 บอกให้ build เป็น static files เพื่อใช้กับ GitHub Pages
  basePath: "/todo-frontend", // 🔹 ชื่อตรงกับชื่อ repo
  images: {
    unoptimized: true, // 🔹 ปิด Image Optimization (จำเป็นสำหรับ static export)
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
