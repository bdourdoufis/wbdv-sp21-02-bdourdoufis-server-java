(function () {
    var $usernameFld, $passwordFld;
    var $firstNameFld, $lastNameFld, $roleFld;
    var $removeBtn, $editBtn, $createBtn, $updateBtn;
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
        $updateBtn = $('.wbdv-update')

        $createBtn.click(createUser)
        $updateBtn.click(updateUser)

        userService
            .findAllUsers()
            .then(function (usersResponse) {
                users = usersResponse
                renderUsers(users)
            })
    }
    function createUser() {
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

        $usernameFld.val("")
        $passwordFld.val("")
        $firstNameFld.val("")
        $lastNameFld.val("")

        userService
            .createUser(user)
            .then(function (userResponse) {
                users.push(userResponse)
                renderUsers(users)
            })
    }
    function deleteUser(event) {
        var button = $(event.target)
        var id = button.attr("id")
        userService.deleteUser(id)
            .then(function (response) {
                userService.findAllUsers()
                    .then(function (usersResponse) {
                        users = usersResponse
                        renderUsers(users)
                    })
            })
    }
    function selectUser(event) {
        debugger;
        var button = $(event.target)
        var id = button.attr("id")
        userService.findUserById(id)
            .then(function (selectedUser) {
                $usernameFld.val(selectedUser.username)
                $passwordFld.val(selectedUser.password)
                $firstNameFld.val(selectedUser.firstName)
                $lastNameFld.val(selectedUser.lastName)
                $roleFld.val(selectedUser.role)
                $('.wbdv-update').attr('id', selectedUser._id)
            })
    }
    function updateUser() {
        if ($tbody.find('.wbdv-update').attr('id') != -1) {
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

            $usernameFld.val("")
            $passwordFld.val("")
            $firstNameFld.val("")
            $lastNameFld.val("")
            debugger;

            userService.updateUser($('.wbdv-update').attr('id'), user)
                .then(function (response) {
                    userService.findAllUsers()
                        .then(function (usersResponse) {
                            users = usersResponse
                            renderUsers(users)
                        })
                })
        }
    }
    function renderUsers(users) {
        $tbody.empty()
        for(var i = 0; i < users.length; i++) {
            const user = users[i]
            const rowClone = $userRowTemplate.clone();
            rowClone.removeClass('wbdv-hidden');
            rowClone.find('.wbdv-username').html(user.username);
            rowClone.find('.wbdv-password').html(user.password);
            rowClone.find('.wbdv-first-name').html(user.firstName);
            rowClone.find('.wbdv-last-name').html(user.lastName);
            rowClone.find('.wbdv-role').html(user.role);
            rowClone.find('.wbdv-remove').attr('id', user._id)
            rowClone.find('.wbdv-edit').attr('id', user._id)
            $tbody.append(rowClone);
        }
        $('.wbdv-remove').click(deleteUser)
        $('.wbdv-edit').click(selectUser)
    }
})();
