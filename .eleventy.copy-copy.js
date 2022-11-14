
// Add to your require() statements at the top of the file:
const { minify: minify_html } = require("html-minifier-terser");
const CleanCSS = require("clean-css");
const is_production = typeof process.env.NODE_ENV === "string" && process.env.NODE_ENV === "production";

function do_minifycss(source, output_path) {
    if(!output_path.endsWith(".css") || !is_production) return source;

    const result = new CleanCSS({
        level: 2
    }).minify(source).styles.trim();
    console.log(`MINIFY ${output_path}`, source.length, `→`, result.length, `(${((1 - (result.length / source.length)) * 100).toFixed(2)}% reduction)`);
    return result;
}

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
/*
const CleanCSS = require("clean-css");
module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });
};
*/


async function do_minifyhtml(source, output_path) {
    if(!output_path.endsWith(".html") || !is_production) return source;

    const result = await minify_html(source, {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        continueOnParseError: true,
        decodeEntities: true,
        keepClosingSlash: true,
        minifyCSS: true,
        quoteCharacter: `"`,
        removeComments: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        sortAttributes: true,
        sortClassName: true,
        useShortDoctype: true
    });

    console.log(`MINIFY ${output_path}`, source.length, `→`, result.length, `(${((1 - (result.length / source.length)) * 100).toFixed(2)}% reduction)`);

    return result;
}

module.exports = function(eleventyConfig) {

    eleventyConfig.addTransform("cssmin", do_minifycss);
    eleventyConfig.addTransform("htmlmin", do_minifyhtml);

}