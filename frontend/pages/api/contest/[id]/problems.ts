// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import type { ContestProblems } from "@utils/types"

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ContestProblems>
) {
    const { id } = req.query;
    res.status(200).json({
        contestName:"Concurso Interpreparatoriano de Programación 2022 (fase final)",
        problemsInfo: [
            {
                id: "123a",
                name: "Problema A - Hot Cakes o",
                author: "RubenRETM",
                slug: "a",
            },
            {
                id: "123b",
                name: "Problema B - Canicas",
                author: "RubenRETM",
                slug: "b",
            },
            {
                id: "123c",
                name: "Problema C - Profundidad",
                author: "RubenRETM",
                slug: "c",
            },
            {
                id: "123d",
                name: "Problema D - Inversort",
                author: "RubenRETM",
                slug: "d",
            },
            {
                id: "123e",
                name: "Problema E - Rectángulos",
                author: "RubenRETM",
                slug: "e",
            },
        ]
    })
}

// data format of fetching problems from 'juezguapa'
// \"msg\":\"changed\",\"collection\":\"concursos\",\"id\":\"SkYzaDD4tD6qHtwMu\",\"fields\":{\"nombre\":\"Google@UNAM 2021\",\"nombre_corto\":\"Google@UNAM 2021\",\"inicio\":{\"$date\":1635544800000},\"fin\":{\"$date\":1635552000000},\"descripcion\":\"Google@UNAM\",\"premios\":\"<strong> Premios sorpresa a los primeros 3 lugares </strong>\\n<p>Nota: para ser elegible para los premios debes estar inscrito actualmente en alguna carrera de la FES Acatlán</p>\",\"reglas\":\"<ul style=\\\"list-style-type:square\\\">\\n <li> No está permitido el uso de redes sociales. </li>\\n <li> No está permitido compartir ninguna información relacionada con el concurso con personas externas al jurado, durante toda la competencia. Esto incluye la descripción de los problemas, los códigos fuente generados y los casos de prueba. </li>\\n <li> No está permitido el uso de herramientas que permitan obtener ventajas injustas, con relación al resto de los participantes. Esto incluye: el acceso a servicios informáticos de alto desempeño, el uso de jueces en línea para validar códigos u otras herramientas, disponibles en línea, que permitan la validación o ejecución de código.</li>\\n <li> El acceso debe realizarse siguiendo las instrucciones proporcionadas el día de prueba. Cualquier otro intento de acceder o comunicarse con los servidores de la competencia no está permitido. Al igual que en ediciones anteriores, todo envío debe ser un intento legítimo de resolver un problema. No se permiten envíos que tengan como propósito desestabilizar el juez GUAPA o busquen obtener información relacionada con los casos de prueba. </li>\\n <li> En caso de que algún concursante incurra en alguna falta, éste será descalificado, sin excepción alguna. </li>\\n <li>La desicisión del jurado es inapelable.</li>\\n <li>Cualquier caso no contemplado en la presente convocatoria será determinado por el jurado.</li>\\n</ul>\\n\\n<p>Contamos con la colaboración de todos para una competencia divertida y enriquecedora.</p>\",\"bases\":\"<ul style=\\\"list-style-type:square\\\" >\\n <li> \\n Instrucciones: tiene como objetivo explicar la dinámica del evento y resolver dudas. <br/>\\n <strong> &nbsp; Fecha:</strong> Viernes 29 de octubre de 2021. <br/>\\n <strong> &nbsp; Hora:</strong> 4:45pm a 5pm. <br/>\\n </li>\\n <li>\\n Concurso: Los participantes resuelven los problemas en un lapso de 2 horas.<br/>\\n <strong> &nbsp; Fecha:</strong> Viernes 29 de octubre de 2021.<br/>\\n <strong> &nbsp; Hora:</strong> 5:00pm a 7:00pm.<br/>\\n <ol type=\\\"a\\\">\\n <li>Debido a la situación actual, el evento será en línea</li>\\n <li>Los lenguajes válidos para la resolución de los problemas son:\\n <ul style=\\\"list-style-type:circle\\\">\\n <li>C.</li>\\n <li>C++.</li>\\n <li>C++ 11.</li>\\n <li>Haskell.</li>\\n <li>Java 8.</li>\\n <li>Python 3.</li>\\n <li>Ruby.</li>\\n </ul>\\n <li>\\n El concurso tendrá una duración de dos horas. En la última media hora el marcador permanecerá congelado<br/>\\n (El scoreboard no se actualizará, sin embargo cada concursante podrá ver su puntaje de manera individual).\\n </li> \\n </ol>\\n </li>\\n <li>\\n La ceremonia de premiación se llevará a cabo 15min. después del concurso y se darán a conocer los resultados de los tres primeros lugares. <br/>\\n <strong> &nbsp; Fecha:</strong> Viernes 29 de octubre de 2021. <br/>\\n <strong> &nbsp; Hora:</strong> 7:15pm a 7:45pm. <br/>\\n </li>\\n </ol>\\n </li>\\n</ul>\",\"congelar_en\":{\"$date\":1635550200000},\"autor\":\"RubenRETM\",\"creado\":{\"$date\":1635481613874},\"imagen\":\"#\",\"slug_corto\":\"google-unam\",\"descongelar_en\":{\"$date\":1635647400000},\"objetivo\":\"<ul style=\\\"list-style-type:square\\\">\\n <li>Estimular a los estudiantes en la participación de eventos académicos de esta naturaleza, para fortalecer sus conocimientos y motivarlos <br/> a incursionar en la investigación sobre el análisis y diseño de algoritmos. </li>\\n <li>Probar la capacidad de abstracción de los participantes en la solución de problemas a través de programación de algoritmos en diversos lenguajes de programación.</li>\\n</ul>\"}}"]	4703	
// a["{\"msg\":\"added\",\"collection\":\"problemas\",\"id\":\"9Jtj43S89ZjjZ7yWo\",\"fields\":{\"autor\":\"RubenRETM\",\"nombre\":\"Problema o - Shuffle\",\"ruta_externa\":\"https://www.dropbox.com/s/9e9c4iq56emch92/Google%40UNAM-Shuffle.pdf?raw=1\",\"slug\":\"problema-o-shuffle\"}}"]	282	
// a["{\"msg\":\"added\",\"collection\":\"problemas\",\"id\":\"MJe4dSJtF3dcNujkg\",\"fields\":{\"autor\":\"RubenRETM\",\"nombre\":\"Problema g - Hot Cakes ocultos\",\"ruta_externa\":\"https://www.dropbox.com/s/ww09tvtf9zwscr6/Google%40UNAM-HotCakesOcultos.pdf?raw=1\",\"slug\":\"problema-g-hot-cakes-ocultos\"}}"]	310	
// a["{\"msg\":\"added\",\"collection\":\"problemas\",\"id\":\"StCwRZ7QbJsdFmoko\",\"fields\":{\"autor\":\"RubenRETM\",\"nombre\":\"Problema l - Canicas\",\"ruta_externa\":\"https://www.dropbox.com/s/0omy5gjaxul3uw2/Google%40UNAM-Canicas.pdf?raw=1\",\"slug\":\"problema-l-canicas\"}}"]	282	
// a["{\"msg\":\"added\",\"collection\":\"problemas\",\"id\":\"h6G3kDqMRKcmfna36\",\"fields\":{\"autor\":\"RubenRETM\",\"nombre\":\"Problema o - Inversort\",\"ruta_externa\":\"https://www.dropbox.com/s/gybpt1d9cywnvpr/Google%40UNAM-Invertsort.pdf?raw=1\",\"slug\":\"problema-o-inversort\"}}"]	289	
// a["{\"msg\":\"added\",\"collection\":\"problemas\",\"id\":\"pGFyJxskmnKb3hJts\",\"fields\":{\"autor\":\"RubenRETM\",\"nombre\":\"Problema e - Profundidad\",\"ruta_externa\":\"https://www.dropbox.com/s/r023mzrn8jrb5k1/Google%40UNAM-Profundidad.pdf?raw=1\",\"slug\":\"problema-e-profundidad\"}}"]	294	
// a["{\"msg\":\"added\",\"collection\":\"problemas\",\"id\":\"wsNZtWCoL6gKSnnBa\",\"fields\":{\"autor\":\"RubenRETM\",\"nombre\":\"Problema G - Rectángulos\",\"ruta_externa\":\"https://www.dropbox.com/s/dbuicoaeb7dtcjf/Google%40UNAM-Rectangulos.pdf?raw=1\",\"slug\":\"problema-g-rectangulos\"}}"]
