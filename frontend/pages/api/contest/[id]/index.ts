// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import type { Contest } from "@utils/types"

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Contest>
) {
    const { id } = req.query;
    console.count()
    res.status(200).json({
        id : id as string,
        name: "Concurso Interpreparatoriano de Programación 2022 (fase final)",
        startTime: new Date("2022-12-31"),
        endTime: new Date("2023-01-28"),
        bases: [
            {
                title: "Objetivos",
                content: `Estimular a los estudiantes en la participación de eventos académicos de esta naturaleza, para fortalecer sus conocimientos y motivarlos
            a incursionar en la investigación sobre el análisis y diseño de algoritmos.
            Reclutar nuevos integrantes para el Grupo Universitario de Algoritmia y Programación Avanzada.
            Probar la capacidad de abstracción de los participantes en la solución de problemas a través de programación de algoritmos en diversos lenguajes de programación.`
            },
            {
                title: "Bases",
                content: `El concurso consiste en resolver 5 problemas de programación, que serán evaluados por casos de acuerdo a su nivel de dificultad.
             El concurso se realizará en tres fases que serán transmitidas por Facebook Live en nuestra página Algoritmia Avanzada Y Programación Competitiva .
             Sesión de prueba: tiene como objetivo explicar la dinámica del evento y resolver dudas.
               Fecha: Martes 27 de abril de 2021.
               Hora: 1:30pm a 2:30pm.
             Concurso: Los participantes resuelven los problemas en un lapso de 5 horas.
               Fecha: Miércoles 28 de abril de 2021.
               Hora: 1:00pm a 6:00pm.
             Debido a la situación actual, el evento será en línea
             El concurso esta abierto a todo público con excepción de aquellas personas
             que hayan obtenido alguno de los tres primeros lugares en ediciones anteriores de este concurso.
             Los estudiantes pueden participar únicamente de manera individual.
             Los lenguajes válidos para la resolución de los problemas son:
             C.
             C++.
             C++ 11.
             Haskell.
             Java 8.
             Python 3.
             Ruby.
             El concurso tendrá una duración de cinco horas. En la última hora el marcador permanecerá congelado
             (El scoreboard no se actualizará, sin embargo cada concursante podrá ver su puntaje de manera individual).
             La ceremonia de premiación se llevará a cabo 30min. después del concurso y se darán a conocer los resultados de los tres primeros lugares.
               Fecha: Miércoles 28 de abril de 2021.
               Hora: 6:30pm a 7:00pm.  `
            },
            {
                title: "Reglas",
                content: `No está permitido el uso de redes sociales.
                No está permitido compartir ninguna información relacionada con el concurso con personas externas al jurado, durante toda la competencia. Esto incluye la descripción de los problemas, los códigos fuente generados y los casos de prueba.
                Se permite el código previamente escrito. También se permite el uso de códigos escritos por terceros, siempre y cuando este código esté disponible en línea antes del inicio del concurso. No está permitido el uso de herramientas que permitan obtener ventajas injustas, con relación al resto de los participantes. Esto incluye: el acceso a servicios informáticos de alto desempeño, el uso de jueces en línea para validar códigos u otras herramientas, disponibles en línea, que permitan la validación o ejecución de código.
                El acceso debe realizarse siguiendo las instrucciones proporcionadas el día de prueba. Cualquier otro intento de acceder o comunicarse con los servidores de la competencia no está permitido. Al igual que en ediciones anteriores, todo envío debe ser un intento legítimo de resolver un problema. No se permiten envíos que tengan como propósito desestabilizar el juez GUAPA o busquen obtener información relacionada con los casos de prueba.
                En caso de que algún concursante incurra en alguna falta, éste será descalificado, sin excepción alguna.
                La desicisión del jurado es inapelable.
                Cualquier caso no contemplado en la presente convocatoria será determinado por el jurado.
                Contamos con la colaboración de todos para una competencia divertida y enriquecedora.`
            },
            {
                title: "Premios",
                content: `Se dará constancia de participación a todos los concursantes de FES Acatlán que lo hayan solicitado
                se dará reconocimiento a los concursantes que se hayan colocado en los tres primeros lugares.
                Habrá premio sorpresa para el primer lugar`
            },
            {
                title: "Tiempo",
                content: `Inicio 28/04/2021 01:00:00 pm
                Fin 28/04/2021 06:00:00 pm
                Marcador congelado 28/04/2021 05:00:00 pm`
            }
        ]
    })
}
