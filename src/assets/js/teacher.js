const coursesItem = document.querySelectorAll('.courses_item')



for (let i of coursesItem) {
  i.addEventListener('click', e => {
    fetch('http://localhost:3232/teacher/group', {
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

const groupSection = document.querySelector('.group_section')

coursesItem.onclick = () => {
  groupSection.style.display = "none";
}
