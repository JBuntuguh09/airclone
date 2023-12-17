/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:[
           "avatars.githubusercontent.com" ,
           "lh3.googleusercontent.com",
           "res.cloudinary.com"
        ]
    },
    output: {
        export:true
    }
}

module.exports = nextConfig
