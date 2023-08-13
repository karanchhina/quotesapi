const html = `

<html>

<head>
    <style type="text/css">
        th,
        td {
            border: 1px solid black;
            border-color: #96D4D4;
            padding: 15px;
            vertical-align: top;
            font-family: "Times New Roman", Times, serif;
            font-size: 20px;
        }
    </style>
</head>

<body>
    <div>
        <h2>Demo Quotes API</h2>
        <table>
            <thead>
                <tr>
                    <th><a href="/basic">/basic</a></th>
                    <th><a href="/premium">/premium</a></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <ul>
                            <li>One random quote</li>
                        </ul>
                    </td>
                    <td>
                        <ul>
                            <li>Five random quotes</li>
                            <li>Search for quotes by tags & authors</li>
                            <li>Save favorite quotes</li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>

</html>
`

export default html;