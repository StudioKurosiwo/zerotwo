


module.exports = function(eleventyConfig) {

    /*eleventyConfig.addPassthroughCopy('./src/css/style.css');*/
    eleventyConfig.addPassthroughCopy('assets');


    return {
        passthroughFileCopy: true,
        markdownTemplateEngine: "njk",
        templateFormats: ["html", "njk", "md" ],
        dir:{
            input : "src",
            output : "_site",
            include: "includes"
        } 
    };

    
}

