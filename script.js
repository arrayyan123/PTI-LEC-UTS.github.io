let data = JSON.parse(localStorage.getItem('data')) || [];
let currentPage = 1;
let pageSize = 10; 


function saveDataToLocalStorage() {
  localStorage.setItem('data', JSON.stringify(data));
}
function resetLocalStorage() {
  localStorage.removeItem('data');
  data = []; 
  renderData(); 
}


function renderData() {
  const tableBody = document.getElementById('dataBody');
  tableBody.innerHTML = '';

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data.slice(startIndex, endIndex);

  paginatedData.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.nim}</td>
      <td>${item.nama}</td>
      <td>${item.prodi}</td>
      <td>${item.alamat}</td>
      <td>
        <button id="edit" onclick="openEditModal('${item.nim}')"><img src="/Assets/Add.png" /></button>
        <button id="delete" onclick="deleteData('${item.nim}')"><img src="/Assets/trash-edit.png" /></button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  renderPagination();
  const totalEntries = data.length;
  const currentPageEntries = paginatedData.length;
  const startEntryIndex = startIndex + 1;
  const endEntryIndex = Math.min(startIndex + currentPageEntries, totalEntries);
  entriesInfo.innerText = `Showing ${startEntryIndex} to ${endEntryIndex} entries of ${totalEntries} entries`;
}

function changePageSize() {
  pageSize = parseInt(document.getElementById('showData').value);
  renderData();
}

function renderPagination() {
  const totalPages = Math.ceil(data.length / pageSize);
  const paginationElement = document.getElementById('pagination');
  paginationElement.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.innerText = i;
    button.addEventListener('click', function() {
      currentPage = i;
      renderData();
    });
    paginationElement.appendChild(button);
  }
}

function openModal(mode) {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const nimInput = document.getElementById('nim');
  const namaInput = document.getElementById('nama');
  const prodiInput = document.getElementById('prodi');
  const alamatInput = document.getElementById('alamat');
  const submitBtn = document.getElementById('submitBtn');

  if (mode === 'add') {
    modalTitle.innerText = 'Tambah Data';
    nimInput.removeAttribute('disabled');
    nimInput.value = '';
    namaInput.value = '';
    prodiInput.value = '';
    alamatInput.value = '';
    submitBtn.innerText = 'Simpan';
  }

  modal.style.display = 'block';
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

function openEditModal(nim) {
    const editModal = document.getElementById('editModal');
    const editModalTitle = document.getElementById('editModalTitle');
    const editNIMInput = document.getElementById('editNIM');
    const editNamaInput = document.getElementById('editNama');
    const editProdiInput = document.getElementById('editProdi');
    const editAlamatInput = document.getElementById('editAlamat');
    const editSubmitBtn = document.getElementById('editSubmitBtn');
  
    const selectedData = data.find(item => item.nim === nim);
    editModalTitle.innerText = 'Edit Data';
    editNIMInput.value = selectedData.nim;
    editNamaInput.value = selectedData.nama;
    editProdiInput.value = selectedData.prodi;
    editAlamatInput.value = selectedData.alamat;
  
    editSubmitBtn.onclick = (event) => {
      event.preventDefault();
      const updatedNIM = editNIMInput.value;
      const updatedNama = editNamaInput.value;
      const updatedProdi = editProdiInput.value;
      const updatedAlamat = editAlamatInput.value;
  
      if (!updatedNIM || !updatedNama || !updatedProdi || !updatedAlamat) {
        showAlert('Data tidak lengkap', 'error');
        return;
      }

      const index = data.findIndex(item => item.nim === nim);
      data[index] = { nim: updatedNIM, nama: updatedNama, prodi: updatedProdi, alamat: updatedAlamat };
      saveDataToLocalStorage();
      showAlert('Data berhasil diperbarui', 'update');
      AlertUpdate();
      renderData();
      closeEditModal();
    };
  
    editModal.style.display = 'block';
}
  
function closeEditModal() {
  const editModal = document.getElementById('editModal');
  editModal.style.display = 'none';
}

function showAlert(message, type) {
  const alertBox = document.getElementById('alertBox');
  alertBox.innerText = message;
  alertBox.className = `alert ${type} show`;

  setTimeout(() => {
    alertBox.className = 'alert';
  }, 3000);
}

function submitData(event) {
  event.preventDefault();
  const nim = document.getElementById('nim').value;
  const nama = document.getElementById('nama').value;
  const prodi = document.getElementById('prodi').value;
  const alamat = document.getElementById('alamat').value;

  if (!nama || !prodi || !alamat) {
    showAlert('Data tidak lengkap', 'error');
    return;
  }

  if (nim === '') {
    showAlert('NIM harus diisi', 'error');
    return;
  }

  const existingDataIndex = data.findIndex(item => item.nim === nim);
  if (existingDataIndex !== -1) {
    showAlert('NIM sudah ada, gunakan fitur edit untuk memperbarui data', 'error');
    alertAddModal();
    return;
  }

  data.push({ nim, nama, prodi, alamat });
  saveDataToLocalStorage();
  openAddModal()
  showAlert('Data berhasil ditambahkan', 'success');
  renderData();
  closeModal();
}

function deleteData(nim) {
  const deleteConfirmBtn = document.getElementById('deleteConfirmBtn');
  deleteConfirmBtn.onclick = () => {
    data = data.filter(item => item.nim !== nim);
    saveDataToLocalStorage();
    renderData();
    showAlert('Data berhasil dihapus', 'delete');
    AlertDelete();
    closeDeleteModal();
  };
  openDeleteModal();
}

function AlertUpdate() {
  const updateAlert = document.getElementById('UpdateAlert');
  updateAlert.style.display = 'block';
}
function closeUpdateAlert(){
  const updateAlert = document.getElementById('UpdateAlert');
  updateAlert.style.display =  'none';
}

function closeAddAlert() {
  const AddAlert = document.getElementById('alertAddModal');
  AddAlert.style.display = 'none';
}
function alertAddModal() {
  const AddAlert = document.getElementById('alertAddModal');
  AddAlert.style.display = 'block';
}
function closeAlertDelete() {
  const Deletealert = document.getElementById('alertDeleteModal');
  Deletealert.style.display="none";
}
function AlertDelete(){
  const Deletealert = document.getElementById("alertDeleteModal") ;
  Deletealert.style.display="block"
}

function openAddModal(){
  const addModal = document.getElementById( "AddDataModal" );
  addModal.style.display= "block";
}
function closeAddModal(){
  const addModal = document.getElementById("AddDataModal");
  addModal.style.display="none";
}
function openDeleteModal() {
  const deleteModal = document.getElementById('deleteModal');
  deleteModal.style.display = 'block';
}

function closeDeleteModal() {
  const deleteModal = document.getElementById('deleteModal');
  deleteModal.style.display = 'none';
}

document.getElementById('editDataForm').addEventListener('submit', openEditModal)

document.getElementById('dataForm').addEventListener('submit', submitData);

renderData();
