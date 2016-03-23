kwota.vm.WelcomeViewModel = function (params) {
    var self = this;
    self.getStarted = function (params) {
        kwota.nav.navigate("newQuotaView");
    };
};

kwota.vm.QuotaViewModel = function (quota) {
    var self = this;
    self.id = quota._id;
    self.action = quota.action;
    self.instances = quota.instances;
    self.filledInstance = ko.observableArray();
    quota.fills.forEach(function (fill) {
        self.filledInstance.push(fill);
    });
    
    var remaining = Number(quota.instances) - quota.fills.length;
    self.unfilledInstance = ko.observableArray();
    for (var i = 0; i < remaining; i++) {
        self.unfilledInstance.push({
            fill: function (params) {
                $.ajax({
                    type: "post",
                    url: "/api/quota/fill",
                    data: {
                        id: self.id,                        
                        note: self.note                                                                        
                    },
                    success: function () {
                                                
                    }
                });                 
            }
        });
    }
};

kwota.vm.QuotasViewModel = function (quotas) {
    var self = this;
    self.openQuotas = ko.observable();
    self.filledQuotas = ko.observable();
    
    var open = [];
    var filled = [];    
    quotas.forEach(function (quota) {
        if (quota.fills.length >= Number(quota.instances)) {
            filled.push(new kwota.vm.QuotaViewModel(quota));            
        } else {
            open.push(new kwota.vm.QuotaViewModel(quota));
        }                         
    });    
    
    if (open.length > 0) {
        self.openQuotas(open);        
    } 
    
    if (filled.length > 0) {
        self.filledQuotas(filled);
    }
                            
    self.newQuota = function () {
        kwota.nav.navigate("newQuotaView");        
    };        
};

kwota.vm.NewQuotaViewModel = function (params) {
    var self = this;
    self.action = ko.observable();
    self.instances = ko.observable(3);
    self.create = function (params) {
        alert("shit");
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
        alert("yippie");
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