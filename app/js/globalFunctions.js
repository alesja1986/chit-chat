
// Makes HTML out of object with template
function getHTMLFromTemplate(templateId, object){
    const template = $(templateId).text();
    const renderer = Handlebars.compile(template);
    const HTML = renderer(object);

    return HTML;
}

// Sort object array by key, assuming the value is a string
function sortObjectArrayByStringKey(arr, key){
    arr.sort(function(a, b){
        console.log(a[key] + ", " + b[key]);
        if(a[key] < b[key])
            return -1;
        if(a[key] > b[key])
            return 1;
        return 0;
    });

}