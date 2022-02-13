const API_URL='https://api.github.com/users/'
const form=document.getElementById('form')
const search=document.getElementById('search')
const main=document.getElementById('main')

//getUser('bradtraversy')


async function getUser(username)
{
    try{
    const res =await axios.get(API_URL+username)

     createUserCard(res)
     getRepos(username)
    }
    catch(err){
        //if(err.response.status == 404)

       // {
            createErrorCard('Problem fetching repos')

           //console.log(err.response)
       // }
    }
   
}
async function getRepos(username)
{
    try{
        const res =await axios.get(API_URL+username+'/repos?sort=created')
    
         addReposToCard(res)
        }
        catch(err){
            //if(err.response.status == 404)
    
           // {
                createErrorCard('No Profile with this username')
               //console.log(err.response)
           // }
        }
}


function createUserCard(user){
    const cardHTML=`<div class="card">
    <div>
        <img src="${user.avatar_url}" class="avatar">
    </div>
    <div class="user-info">
        <h2>${user.name===null?user.login:user.name}</h2>
        <p>${user.bio==null?'':user.bio}</p>
        <ul>
            <li>${user.followers} <strong>Followers</strong></li>
            <li>${user.following} <strong>Following</strong></li>
            <li>${user.public_repos} <strong>Repos</strong></li>
        </ul>
          
        <div id="repos">
            
        </div>
    </div>
</div>
`
main.innerHTML=cardHTML
}

function createErrorCard(msg)
{
    const cardHTML=`
    <div class="card">
    <h1>${msg}</h1>
    </div>
    `
    main.innerHTML=cardHTML
}

function addReposToCard(repos)
{
    const reposEl=document.getElementById('repos')
    repos.slice(0,5).forEach(repo=>{
        const repoEl=document.createElement('a')
        repoEl.classList.add('repo')
        repoEl.href=repo.html_url
        repoEl.target='_blank';
        repoEl.innerText=repo.name;
        reposEl.appendChild(repoEl)
    })
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const user= search.value
    if(user){
        getUser(user)
        search.value=''
    }
})
