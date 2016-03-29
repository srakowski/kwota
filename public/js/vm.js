kwota.vm.WelcomeViewModel = function (params) {
    var self = this;
    self.getStarted = function (params) {
        kwota.nav.navigate("newQuotaView");
    };
};



kwota.vm.NewQuotaViewModel = function (params) {
    var self = this;
    self.action = ko.observable();
    self.instances = ko.observable(3);
    self.create = function (params) {
        $.ajax({
            type: "POST",
            url: "/api/quota/",
            data: { 
                action: self.action(),
                instances: self.instances()                    
            }, 
            success: self.endCreate,
            error: function (err) {
                alert(err);
            }
        });
    }
    self.endCreate = function () {
    }
};

kwota.vm.AppViewModel = function (params) {
    var self = this;
    self.viewName = ko.observable("loadingView");
    self.viewModel = ko.observable(null);        
    self.load =  function (viewName, viewModel) {
        self.viewName("loadingView");
        self.viewModel(viewModel);
        self.viewName(viewName);
    };
    
    self.start = function () {
                
        $.get("/api/quota", function (quotas) {
            
            if (quotas.length > 0) {
                kwota.nav.navigate("quotasView", quotas);
            } else {
                kwota.nav.navigate("welcomeView");
            }
            
        });       
           
    };
};
