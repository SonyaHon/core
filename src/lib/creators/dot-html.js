export default title => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
</head>
<body>
    <div id="root"></div>
    <script>console.log('Hello World!')</script>
    <script src="io-client"></script>
    <script>
    var socket = io();
</script>
</body>
</html>`;
