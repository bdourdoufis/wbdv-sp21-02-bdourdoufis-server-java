(function () {
    var $usernameFld, $passwordFld;
    var $firstNameFld, $lastNameFld, $roleFld;
    var $removeBtn, $editBtn, $createBtn;
    var $userRowTemplate, $tbody;
    var userService = new AdminUserServiceClient();
    $(main);

    var users = [];

    function main() {
        $userRowTemplate = $('.wbdv-template')
        $createBtn = $('.wbdv-create')
        $tbody = $('.wbdv-tbody')
        $usernameFld = $('#usernameFld')
        $passwordFld = $('#passwordFld')
        $firstNameFld = $('#firstNameFld')
        $lastNameFld = $('#lastNameFld')
        $roleFld = $('#roleFld')

        $createBtn.click(createUser)

        userService
            .findAllUsers()
            .then(function (usersResponse) {
                users = usersResponse
                renderUsers(users)
            })
    }
    function createUser() {
        debugger;
        var username = $usernameFld.val()
        var password = $passwordFld.val()
        var firstName = $firstNameFld.val()
        var lastName = $lastNameFld.val()
        var role = $roleFld.val()

        var user = {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            role: role
        }

        userService
            .createUser(user)
            .then(function (userResponse) {
                users.push(userResponse)
                renderUsers(users)
            })
    }
    function deleteUser(event) {
        debugger;
        var button = $(event.target)
        var id = button.attr("id")
        userService.deleteUser(id)
        userService.findAllUsers()
            .then(function (usersResponse) {
                users = usersResponse
                renderUsers(users)
            })
    }
    function selectUser() {}
    //function updateUser() { … }
    function renderUsers(users) {
        $tbody.empty()
        for(var u in users) {
            const user = users[u]
            const rowClone = $userRowTemplate.clone();
            rowClone.removeClass('wbdv-hidden');
            rowClone.find('.wbdv-username').html(user.username);
            rowClone.find('.wbdv-password').html(user.password);
            rowClone.find('.wbdv-first-name').html(user.firstName);
            rowClone.find('.wbdv-last-name').html(user.lastName);
            rowClone.find('.wbdv-role').html(user.role);
            rowClone.find('wbdv-remove').attr('id')
            $tbody.append(rowClone);
        }
        $('.wbdv-remove').click(deleteUser)
        $('.wbdv-edit').click(selectUser)
    }
    //function findAllUsers() { … } // optional - might not need this
    //function findUserById() { … } // optional - might not need this
})();
