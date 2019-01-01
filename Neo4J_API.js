//cf https://neo4j.com/docs/api/javascript-driver/current/

const Neo4JDriver_HTML = "https://unpkg.com/neo4j-driver"

var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "neo4j"), {maxTransactionRetryTime: 30000});
var session = driver.session();

function getCourseByTitle(courseTitle) {
    const query =  `
        MATCH (n:Course{title:'${courseName}'})
        RETURN n
    `;
    return runQuery(query)
}

function getCourseById(courseId) {
    const query =  `
        MATCH (n:Course{tmpId:'${courseId}'})
        RETURN n
    `;
    return runQuery(query)
}

function getCourseByProfessor(professorName) {
    const query =  `
        MATCH (p:Professor)-[r:TEACHES]->(c:Course)
        WHERE p.name = '${professorName}'
        RETURN c
    `;
    return runQuery(query)
}

function getCourseByLanguage(languageName) {
    const query =  `
        MATCH (c:Course)-[r:LANGUAGE]->(l:Language)
        WHERE l.name = '${languageName}'
        RETURN c
    `;
    return runQuery(query)
}

function getCourseByProvider(providerName) {
    const query =  `
        MATCH (p:Provider)-[r:PROVIDES]->(c:Course)
        WHERE p.name = '${providerName}'
        RETURN c
    `;
    return runQuery(query)
}

function getCourseByCategoryNumber(categoryNumber) {
    const query =  `
        MATCH (co:Course)-[r:IS_CATEGORY]->(cat:Category)
        WHERE cat.number = '${categoryNumber}'
        RETURN co
    `;
    return runQuery(query)
}

//TODO: add names to categories
function getCourseByCategoryName(categoryName) {
    const query =  `
        MATCH (co:Course)-[r:IS_CATEGORY]->(cat:Category)
        WHERE cat.name = '${categoryName}'
        RETURN co
    `;
    return runQuery(query)
}

function getAllNodes() {
    const query =  `
        MATCH (n)
        RETURN n
    `;
    return runQuery(query)
}

function getAllEdges(categoryName) {
    const query =  `
        MATCH (a)-[r]->(b)
        RETURN r
    `;
    return runQuery(query)
}

//TODO: Fix the runQuery function
function runQuery(query) {
           //Promise based stuff
            var readTxResultPromise = session.readTransaction(function (transaction,query) {
              var result = transaction.run(query);
              return result;
        });

        readTxResultPromise.then(function (result) {
          session.close();
          console.log(result.records);
        }).catch(function (error) {
          console.log(error);
        });
}




//**TODO** check if necessary
driver.close();