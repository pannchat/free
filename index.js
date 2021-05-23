document.addEventListener('DOMContentLoaded',render);
// 초기 렌더링
function render(){
    fetch('https://pannchat.github.io/fe-problems.json')
        .then((res)=>{
            return res.json();
        }).then((data) =>{ 
            const feProblem = data['data'];
            leftSection = document.getElementById('left-section');
            problem='';
            feProblem.forEach((item,index) => {
                problem += `<li class="problem" id="${item.id}">
                <div class="problem-header">
                    <div class="problem-type">${item.problemType}</div>
                    <div class="problem-num-L">${index+1}</div>
                </div>
                <div class="problem-body">
                    <div class="problem-title">${item.unitName}</div>
                    <div>
                        <img src="${item.problemURL}">
                    </div>
                </div>
                <div class="problem-tail">
                    <div class="problem-btn">
                    <input onchange="problemSimilar(${item.id})" id="${item.id}btn" type="checkbox" style="display:none" />
                    <label id="${item.id}label" for="${item.id}btn" class="btn">유사문항</label>
                    <button onclick="problemRemove(${item.id},'L')">삭제</button>
                    </div>
                </div>
            </li>`;
            });
            leftSection.innerHTML = problem;
            }
        )};
// 유사문제 렌더링
function problemSimilar(id){
    fetch('https://pannchat.github.io/fe-similars.json')
        .then((res)=>{
            return res.json();
        }).then((data) =>{ 
            const siProblem = data['data'];
            var show = document.getElementById('right');
            show.style.display='block';
            var btn = document.getElementById(id+'btn');
            var label = document.getElementById(id+'label');
                if (btn.checked){
                    label.style.backgroundColor='#00ABFF';
                    label.style.color = '#fff'
                    rightSection = document.getElementById('right-section');
                    problem='';

                    siProblem.forEach((item,index) => {
                        
                        problem += `<div class="problem" id="${item.id}">
                        <div class="problem-header">
                            <div class="problem-type">${item.problemType}</div>
                            <div class="problem-num-R">${index+1}</div>
                        </div>
                        <div class="problem-body">
                            <div class="problem-title">${item.unitName}</div>
                            <div>
                                <img src="${item.problemURL}">
                            </div>
                        </div>
                        <div class="problem-tail">
                            <div class="problem-btn">
                            <button onclick="insertProblem(${id},${item.id})">추가</button>
                            <button onclick="changeProblem(${id},${item.id})">교환</button>
                            </div>
                        </div>
                    </div>`;
                    });
                    rightSection.innerHTML = problem;

                }else{
                    label.style.backgroundColor='#fff';
                    label.style.color = '#00ABFF'
                    rightSection.innerHTML = '';
                }

        let exit = document.getElementById('exit');
        // 유사문제 버튼상태 확인
        try{
            exit.addEventListener('click',()=>{
            document.getElementById('right').style.display='none';
                btn.checked = false;
                label.style.backgroundColor='#fff';
                    label.style.color = '#00ABFF'
            
            })
        
        }catch{
            
        }
    }
        )}
// 문제가 삽입된 경우 문제 번호 재 정렬
function insertProblem(id,newNode){
    id = document.getElementById(id);
    newNode = document.getElementById(newNode);
    id.parentNode.insertBefore(newNode,id.nextSibling);
    problem = document.querySelectorAll('#left-section div.problem-num-L,#left-section div.problem-num-R');
    listSort(problem);
    problem = document.querySelectorAll('#right-section div.problem-num-R');
    listSort(problem);
}
// 문제 번호 정렬
function listSort(problem){
    problem.forEach( (item,index) => {
        item.innerHTML = index+1;
    });
}
function changeProblem(ids,changeNodes){
    id = document.getElementById(ids);
    tempId = id;
    changeNode = document.getElementById(changeNodes);
    tmpChangeNode = changeNode;
    id.replaceWith(tmpChangeNode);

    changeNode.children[2].innerHTML = `<div class="problem-btn"><input onchange="problemSimilar(${changeNodes})" id="${changeNodes}btn" type="checkbox" style="display:none" checked/>
                <label id="${changeNodes}label" for="${changeNodes}btn" class="btn" >유사문항</label>
                <button onclick="problemRemove(${changeNodes},'L')">삭제</button></div>`;
                // console.log(tempId)
                problemSimilar(changeNodes);

}

function problemRemove(id, direction){
    var problem = document.getElementById(id);
    problem.parentNode.removeChild(problem);
    if (direction == 'L'){
        feProblem = (feProblem.filter(index => index.id !== id));
        // render();
        problem = document.querySelectorAll('#left-section div.problem-num-L');

    }else{
        siProblem = (siProblem.filter(index => index.id !== id));
        // render();
        problem = document.querySelectorAll('#right-section div.problem-num-R');
        console.log(problem)
    }
    listSort(problem);

}