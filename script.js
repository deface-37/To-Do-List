const taskList = document.getElementById('task-list')
const addButton = document.getElementById('add-task-button')
const inputTask = document.getElementById('input-task')

function updateTasksInStorage() {
    const tasksInfo = []
    for (const taskElement of document.querySelectorAll('.task-element')) {
        const checkbox = taskElement.querySelector('input')
        const textElement = taskElement.querySelector('.task')

        tasksInfo.push({isDone: checkbox.checked, taskName: textElement.textContent})
    }

    localStorage.setItem('tasks', JSON.stringify(tasksInfo))
}

taskList.addEventListener('click', ev => {
    if (ev.target.classList.contains('delete-btn')) {
        ev.target.parentElement.remove()

        updateTasksInStorage()
    }
})

function createTask(taskName, isDone) {
    const template = document.createElement('template')
    template.innerHTML = `<li class="task-element">
            <input type="checkbox">
            <span class="task">${taskName}</span>
            <button type="button" class="delete-btn"></button>
        </li>`

    const checkbox = template.content.querySelector('input')
    checkbox.checked = isDone
    markCheckedTask(checkbox)

    return template.content
}

addButton.addEventListener('click', ev => {
    if (!inputTask.reportValidity()) {
        inputTask.classList.add('tried')
        return
    }

    taskList.append(createTask(inputTask.value))
    inputTask.classList.remove('tried')
    inputTask.value = ''

    updateTasksInStorage()
})

function markCheckedTask(checkBox) {
    const span = checkBox.nextElementSibling

    if (checkBox.checked) {
        span.classList.add('done')
    } else {
        span.classList.remove('done')
    }
}

taskList.addEventListener('change', ev => {
    if (ev.target.tagName !== 'INPUT') return

    const checkBox = ev.target
    markCheckedTask(checkBox)

    updateTasksInStorage()
})

function getTasksFromStorage() {
    const taskList = JSON.parse(localStorage.getItem('tasks')) || []

    return taskList.map(taskInfo => createTask(taskInfo.taskName, taskInfo.isDone))
}


taskList.append(...getTasksFromStorage())