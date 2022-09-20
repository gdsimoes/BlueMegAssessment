"use strict";

// App constants
const numberOfTasks = 20;
let concurrencyMax = 4;
const taskList = [...Array(numberOfTasks)].map(() =>
    [...Array(~~(Math.random() * 10 + 3))]
        .map(() => String.fromCharCode(Math.random() * (123 - 97) + 97))
        .join("")
);

// Colors
const red = "\x1b[31m";
const cyan = "\x1b[36m";
const reset = "\x1b[0m";

// This entire function was in the starter code
var doTask = (taskName) => {
    var begin = Date.now();
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            var end = Date.now();
            var timeSpent = end - begin + "ms";
            console.log(
                cyan,
                "[TASK] FINISHED: " + taskName + " in " + timeSpent,
                reset
            );
            resolve(true);
        }, Math.random() * 200);
    });
};

function init() {
    function manageConcurrency(taskList) {
        // Get current taskName, change state
        const taskName = taskList[counter];
        counter++;
        concurrencyCurrent++;

        // Print EXE information
        console.log(`Concurrency: ${concurrencyCurrent} of ${concurrencyMax}`);
        console.log(`Task count ${counter} of ${taskList.length}`);

        console.log(red, "[TASK] STARTING: " + taskName, reset);

        doTask(taskName).then(() => {
            tasksDone++;
            concurrencyCurrent--;

            // Since concurrencyMax can change on the fly we need to make sure concurrencyCurrent is lower
            if (
                concurrencyCurrent < concurrencyMax &&
                counter < taskList.length
            ) {
                manageConcurrency(taskList);
            } else if (tasksDone === taskList.length) {
                // When last task is done print message
                console.log("All tasks successfully completed");
            }
        });
    }

    // State variables
    let counter = 0;
    let tasksDone = 0;
    let concurrencyCurrent = 0;

    // Initial information
    console.log("[init] Concurrency Algo Testing...");
    console.log("[init] Tasks to process: ", taskList.length);
    console.log("[init] Task list: " + taskList);
    console.log("[init] Maximum Concurrency: ", concurrencyMax, "\n");

    // Start up to concurrencyMax tasks concurrently
    const max = Math.min(concurrencyMax, taskList.length);
    for (let i = 0; i < max; i++) {
        manageConcurrency(taskList);
    }
}

// Initialize the app
console.log("INIT...");
init();

// Change concurrencyMax to 2 to prove that the manageConcurrency function can handle it
setTimeout(() => {
    concurrencyMax = 2;
    console.log(`*** changing concurrency to ${2} ***`);
}, 300);
