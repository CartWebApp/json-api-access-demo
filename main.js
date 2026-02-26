import { fetchJson } from './utils.js';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

async function init() {
  const root = document.querySelector('#root');
  const url  = 'https://eecu-data-server.vercel.app/data';

  try {
    const jobs = await fetchJson(url);
    root.append(buildList(jobs));
  } catch (err) {
    root.style.color = 'red';
    root.textContent = `Error: ${err.message}`;
  }
}

function buildList(jobs = []) {
  const frag = document.createDocumentFragment();
  for (const { Occupation, Salary } of jobs) {
    const section = document.createElement('section');

    const occ = document.createElement('div');
    occ.innerHTML = `<strong>Occupation</strong>: ${Occupation}`;
    section.append(occ);

    const sal = document.createElement('div');
    sal.innerHTML = `<strong>Salary</strong>: ${formatter.format(Salary)}`;
    section.append(sal);

    frag.append(section);
  }
  return frag;
}

document.addEventListener('DOMContentLoaded', init);