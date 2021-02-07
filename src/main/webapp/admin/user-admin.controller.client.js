(function () {
    var $usernameFld, $passwordFld;
    var $firstNameFld, $lastNameFld, $roleFld;
    var $removeBtn, $editBtn, $createBtn;
    var $userRowTemplate, $tbody;
    var userService = new AdminUserServiceClient();
    $(main);

    function main() { … }
    function createUser() { … }
    function deleteUser() { … }
    function selectUser() { … }
    function updateUser() { … }
    function renderUsers(users) { … }
    function findAllUsers() { … } // optional - might not need this
    function findUserById() { … } // optional - might not need this
})();
