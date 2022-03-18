{


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
    //if elementy taskList done:true -> splice
  };

  const przyciski = () => {
    const ukryj = document.querySelector(".js-ukryj");
    const ukoncz = document.querySelector(".js-ukoncz");
    ukryj.addEventListener("click", onUkryj);
    ukoncz.addEventListener("click", onUkoncz);
  };

  const render = () => {
    let htmlString = "";

    for (const task of taskList) {
      htmlString += `<div class="flex">
    <button class="js-tickTask">✔</button>
    <li ${task.done ? "class = \"taskDone\"" : ""}>${task.content}</li>
    <button class="js-removeTask">🗑️</button>
    </div>`;
    };

    const result = document.querySelector(".js-tasks");
    result.innerHTML = htmlString;
    console.log(taskList); // dlaczego wymusza tablice let ??? dlaczego nie widac jej w konsoli ?? 
    tickButton();
    removeButton();
    przyciski();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const newTask = document.querySelector(".js-newTask").value.trim();
    newTask === "" ? void (0) :
      taskList = [...taskList, { content: newTask, done: false }];
    render();
  };


  const init = () => {
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();

  let taskList = [];

}