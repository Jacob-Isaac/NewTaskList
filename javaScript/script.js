{
  const changeTextSize = (newTask) => {
     if (newTask.length > 68)
     {
       document.getElementById("js-tasksTextSize").classList.add('tasks__smallText');
     }  
  }

  const onRemove = (index) => {
    taskList = [
      ...taskList.slice(0, index),
      ...taskList.slice(index + 1),
    ];
    render();
  }

  const onTick = (index) => {
    taskList = [
      ...taskList.slice(0, index),
      { ...taskList[index], done: !taskList[index].done }, //zrób odwrotność obecnego stanu
      ...taskList.slice(index + 1),
    ];
    render();
  }

  const removeButton = () => {
    const remove = document.querySelectorAll(".js-removeTask");
    remove.forEach((removedOne, index) => {
      removedOne.addEventListener("click", () => {
        onRemove(index);
      });
    });
  }

  const tickButton = () => {
    const ticks = document.querySelectorAll(".js-tickTask");
    ticks.forEach((tick, index) => {
      tick.addEventListener("click", () => {
        onTick(index);
      });
    });
  }

  const onUkoncz = () => {
    taskList = taskList.map((task) =>
      ({ ...task, done: true }))
    render();
  };

  const onUkryj = () => {
    console.log(taskList);
    hideTasks = !hideTasks;
    render();
  };

  const przyciski = () => {
    const ukryj = document.querySelector(".js-hide");
    const ukoncz = document.querySelector(".js-complete");
    ukryj.addEventListener("click", onUkryj);
    ukoncz.addEventListener("click", onUkoncz);
  };

  const render = () => {
    let htmlString = "";
    let hideTasksHtml = "";
    for (const task of taskList) {
      htmlString += `<li class = ${task.done && hideTasks === true ? "\"taskHide\"" : "\"tasks__flex tasks__border-bottom\""}>
    <button class="js-tickTask tasks__buttonProperties">✔</button>
    <span ${task.done ? "class = \"taskDone tasks__flexGrowContent\"" : "class = \"tasks__flexGrowContent\""}>&nbsp;&nbsp;${task.content}</span>
    <button class="js-removeTask tasks__buttonProperties">🗑️</button>
    <p></p>
    </li>`
    };
    hideTasksHtml += `${hideTasks === true ? "Pokaż ukończone" : "Ukryj ukończone"}`;
//<p class= ${task.done && hideTasks === true ? "\"taskHide\"" : "\"tasks__border-bottom\""}></p>
    const result = document.querySelector(".js-tasks");
    const ukryj = document.querySelector(".js-hide");
    result.innerHTML = htmlString;
    ukryj.innerHTML = hideTasksHtml;
    console.log(taskList); 
    tickButton();
    removeButton();
    przyciski();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const newTask = document.querySelector(".js-newTask").value.trim();
    const newTaskFocus = document.querySelector(".js-newTask");
    newTask === "" ? null :
      taskList = [...taskList, { content: newTask, done: false }];
    changeTextSize(newTask);
    newTaskFocus.focus();
    newTaskFocus.value = "";
    render();
  };


  const init = () => {
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();

  let taskList = [];
  let hideTasks = false;

}