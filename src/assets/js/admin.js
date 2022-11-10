const cardsSection = document.querySelector('.cards_section')
const coursesSection = document.querySelector('.courses_section')
const teacherSection = document.querySelector('.teacher_section')
const groupSection = document.querySelector('.group_section')
const sudentSection = document.querySelector('.student_section')

const dashboardBtn = document.querySelector('.dashboard')
const teacherBtn = document.querySelector('.edit')
const coursBtn = document.querySelector('.write')
const groupBtn = document.querySelector('.comments')
const studentBtn = document.querySelector('.users')

dashboardBtn.onclick = () => {
  cardsSection.style.display = "flex";
  coursesSection.style.display = "none";
  groupSection.style.display = "none";
  teacherSection.style.display = "none";
  sudentSection.style.display = "none";
}

coursBtn.onclick = () => {
  coursesSection.style.display = "block";
  teacherSection.style.display = "none";
  groupSection.style.display = "none";
  cardsSection.style.display = "none";
  sudentSection.style.display = "none";
}

teacherBtn.onclick = () => {
  teacherSection.style.display = "block";
  cardsSection.style.display = "none";
  groupSection.style.display = "none";
  coursesSection.style.display = "none";
  sudentSection.style.display = "none";
}

groupBtn.onclick = () => {
  groupSection.style.display = "block";
  cardsSection.style.display = "none";
  coursesSection.style.display = "none";
  teacherSection.style.display = "none";
  sudentSection.style.display = "none";

}

studentBtn.onclick = () => {
  sudentSection.style.display = "block";
  cardsSection.style.display = "none";
  coursesSection.style.display = "none";
  teacherSection.style.display = "none";
  groupSection.style.display = "none";
}

// ! delete cours
const deleteBtn = document.querySelectorAll('.courses_btn')

for (let i of deleteBtn) {
  i.addEventListener('click', e => {
    fetch('http://localhost:3232/admin/delCours', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ id: e.target.id })
    })
      .then(res => res.json())
      .then(data => JSON.parse(data))
      .catch(err => console.log(err))

  })
}

// !delete teacher 
const teachBtn = document.querySelectorAll('.teacher_btn')

for (let i of teachBtn) {
  i.addEventListener('click', e => {
    fetch('http://localhost:3232/admin/delTeach', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ id: e.target.id })
    })
      .then(res => res.json())
      .then(data => JSON.parse(data))
      .catch(err => console.log(err))

  })
}

// ! delete group 

const delGroupBtn = document.querySelectorAll('.group_btn')

for (let i of delGroupBtn) {
  i.addEventListener('click', e => {
    fetch('http://localhost:3232/admin/delGroup', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ id: e.target.id })
    })
      .then(res => res.json())
      .then(data => JSON.parse(data))
      .catch(err => console.log(err))

  })
}

// ! delete student
const delSrudBtn = document.querySelectorAll('.stud_btn')


for (let i of delSrudBtn) {
  i.addEventListener('click', e => {
    fetch('http://localhost:3232/admin/delStudent', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ id: e.target.id })
    })
      .then(res => res.json())
      .then(data => JSON.parse(data))
      .catch(err => console.log(err))

  })
}
