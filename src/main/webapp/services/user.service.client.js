function AdminUserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;
    this.url = 'https://wbdv-generic-server.herokuapp.com/api/001642694/users';
    var self = this;
    function createUser(user) {
        return fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        }).then(function (response) {
            return response.json()
        })
    }
    function findAllUsers() {
        return fetch(this.url).then(function(response) {
            return response.json()
        })
    }

    function findUserById(userId) {
        return fetch(this.url + '/' + userId).then(function(response) {
            return response.json()
        })
    }
    function updateUser(userId, user) {
        return fetch(this.url + '/' + userId, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        }).then(function (response) {
            return response.json()
        })
    }
    function deleteUser(userId) {
        return fetch(this.url + '/' + userId, {
            method: 'DELETE',
        }).then(function (response) {
            return response.json()
        })
    }
}
