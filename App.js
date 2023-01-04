const addTaskButton = document.getElementById('addTaskBtn');
const closeTaskDiscriptionButton = document.getElementById('closeTaskDiscription');
const addTask = document.getElementById('add-task');

let startDate = document.getElementById('start-date');
let endDate = document.getElementById('end-date');

const localStorageKey = "tasksArray";

const getTasksArray = () => {
    let array = localStorage.getItem(localStorageKey);

    if(!array){
        return [];
    }

    return JSON.parse(array);
}

let tasks = getTasksArray();

const setTasksArray = () => {
    const array = JSON.stringify(tasks);
    localStorage.setItem(localStorageKey, array);
}

let count = tasks.length + 1;

addTaskButton.addEventListener('click', toggleTaskBar);
closeTaskDiscriptionButton.addEventListener('click', toggleTaskBar);

function toggleTaskBar(){ 
    startDate.valueAsDate = new Date();
    endDate.valueAsDate = new Date();
    document.getElementById('task-discription').classList.toggle('active');
}


addTask.addEventListener('click', addingTask);

function addingTask(){
    let task = document.getElementById('task').value.trim();
    if(task === ''){
        alert('Task cannot be empty!');
    }
    let start = startDate.value.split("");
    let end = endDate.value.split("");

    start = start.filter((element) => {
       return element != '-';
    })
    end = end.filter(element => {
        return element != '-';
    })
    start = Number(start.join(''));
    end = Number(end.join(''));
    
    if(end < start){
        alert("Task cannot end before it start's.")
        return;
    }
    
    let discription = document.getElementById('discription').value;

    if(discription === ''){
        alert('Discription cannot be empty.');
        return;
    }

    let status = document.getElementById('status').value;

    let obj = {
        Id: count,
        Task: task,
        Status: status,
        StartDate: startDate.value,
        EndDate: endDate.value,
        Discription: discription
    }
    console.log((obj));
    tasks.push(obj);
    count++;

    toggleTaskBar();
    clearInnerHtml();
    renderData();
    setTasksArray();
}

function clearInnerHtml(){
    document.getElementById('open').innerHTML ='';
    document.getElementById('in-progress').innerHTML ='';
    document.getElementById('review').innerHTML ='';
    document.getElementById('completed').innerHTML ='';
}

function renderData(){
    tasks.forEach((obj) =>{
        let outerDiv = document.createElement('div');
        outerDiv.classList.add('createdTasks', 'border-dark-subtle', 'm-2');
        outerDiv.setAttribute('ondblclick', `renderTasksData(${obj.Id})`);
        outerDiv.setAttribute('draggable', 'true');
        outerDiv.setAttribute('ondragstart', 'drag(event)');
        outerDiv.setAttribute('id', `task${obj.Id}`);

        let taskTag = document.createElement('p');
        taskTag.innerHTML = obj.Task;
        let discriptionTag = document.createElement('p');
        discriptionTag.innerHTML = obj.Discription;
        
        outerDiv.appendChild(taskTag);
        outerDiv.appendChild(discriptionTag);
        let innnerDiv = document.createElement('div');
        innnerDiv.classList.add('tasks', 'active');
        innnerDiv.setAttribute('id', `${obj.Id}`);

        let component1 = document.createElement('div');
        component1.classList.add('mb-3');

        let labelcomp1 = document.createElement('label');
        labelcomp1.setAttribute('for', 'task');
        labelcomp1.classList.add('form-label');
        labelcomp1.innerText = 'Title';
        let inputcomp1 = document.createElement('input');
        inputcomp1.setAttribute('type', 'text');
        inputcomp1.classList.add('form-control')
        inputcomp1.value = obj.Task;
        inputcomp1.disabled = true;

        component1.appendChild(labelcomp1);
        component1.appendChild(inputcomp1);

        innnerDiv.appendChild(component1);

        let statusComponent = document.createElement('div');
        statusComponent.classList.add('mb-3');

        let statuslabel = document.createElement('label');
        statuslabel.setAttribute('for', `status${obj.Id}`);
        statuslabel.innerHTML = 'Status';
        let selectStatus = document.createElement('select');
        selectStatus.classList.add("form-control");
        selectStatus.setAttribute('id', `status${obj.Id}`);
        let option1 = document.createElement('option');
        option1.setAttribute('value', 'open');
        option1.innerHTML = 'Open';
        let option2 = document.createElement('option');
        option2.setAttribute('value', 'in-progress');
        option2.innerHTML = 'In-Progress';
        let option3 = document.createElement('option');
        option3.setAttribute('value', 'review');
        option3.innerHTML = 'Review';
        let option4 = document.createElement('option');
        option4.setAttribute('value', 'completed');
        option4.innerHTML = 'Completed';
        selectStatus.appendChild(option1);
        selectStatus.appendChild(option2);
        selectStatus.appendChild(option3);
        selectStatus.appendChild(option4);
        selectStatus.disabled = 'true';

        statusComponent.appendChild(statuslabel);
        statusComponent.appendChild(selectStatus);

        innnerDiv.appendChild(statusComponent);


        let component2 = document.createElement('div');
        component2.classList.add('mb-3');

        let labelcomp2 = document.createElement('label');
        labelcomp2.setAttribute('for', 'startdate');
        labelcomp2.classList.add('form-label');
        labelcomp2.innerText = 'Start Date';

        let inputcomp2 = document.createElement('input');
        inputcomp2.setAttribute('type', 'date');
        inputcomp2.classList.add('form-control')
        inputcomp2.disabled = true;
        inputcomp2.value = obj.StartDate;

        component2.appendChild(labelcomp2);
        component2.appendChild(inputcomp2);

        innnerDiv.appendChild(component2);

        let component3 = document.createElement('div');
        component3.classList.add('mb-3');

        let labelcomp3 = document.createElement('label');
        labelcomp3.setAttribute('for', 'endDate');
        labelcomp3.classList.add('form-label');
        labelcomp3.innerText = 'End Date';

        let inputcomp3 = document.createElement('input');
        inputcomp3.setAttribute('type', 'date');
        inputcomp3.classList.add('form-control')
        inputcomp3.disabled = true;
        inputcomp3.value = obj.EndDate;

        component3.appendChild(labelcomp3);
        component3.appendChild(inputcomp3);

        innnerDiv.appendChild(component3);


        let component4 = document.createElement('div');
        component4.classList.add('mb-3');
        let labelcomp4 = document.createElement('label');
        labelcomp4.setAttribute('for', 'discription');
        labelcomp4.classList.add('form-label');
        labelcomp4.innerText = 'Discription';

        let textArea = document.createElement('textarea');
        textArea.classList.add('form-control')
        textArea.setAttribute('rows', '3');
        textArea.setAttribute('style', 'resize: none');
        textArea.value = obj.Discription;
        textArea.disabled = true;

        component4.appendChild(labelcomp4);
        component4.appendChild(textArea);

        innnerDiv.appendChild(component4);

        let component5 = document.createElement('div');
        component5.classList.add('add-btn');
        component5.innerText = 'x';
        component5.setAttribute('onclick', `renderTasksData(${obj.Id})`)

        innnerDiv.appendChild(component5);

        outerDiv.appendChild(innnerDiv);

        document.getElementById(`${obj.Status}`).appendChild(outerDiv);

    });

}

renderData();

function renderTasksData(id){
    document.getElementById(id).classList.toggle('active');
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData('text', event.target.id);
}

function drop(event){
    event.preventDefault();
    var data = event.dataTransfer.getData('text');
    event.target.appendChild(document.getElementById(data));

    let id = Number(data.charAt(4));
    tasks[id - 1].Status = event.target.id;
    setTasksArray();
}