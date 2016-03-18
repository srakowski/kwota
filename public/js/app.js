$(document).ready(function() {
    
    var layoutViewModel = kendo.observable({                        
    });

    var layout = new kendo.Layout("layoutTemplate", { model: layoutViewModel });
    layout.render("#app");       
    
    kwota.router.route('/', function () {                        
        var vm = kwota.viewModels.QuotasViewModel();
        vm.initialize();
        
        var quotasView = new kendo.View("quotasView", { model:  vm});
                     
        layout.showIn($("#view"), quotasView);             
    });

    // kwota.router.route('/new', function () {
    //     var quotasVM = kendo.observable({
    //     });
        
    //     var quotasView = new kendo.View("newQuotaView", { model: quotasVM });     
        
    //     layout.showIn($("#view"), quotasView);                         
    // });                          
    
    kwota.loadModules([
        '/viewModels/quotaViewModel.html',
        '/views/openQuotaView.html',
        '/views/filledQuotaView.html',
        '/viewModels/quotasViewModel.html',        
        '/views/quotasView.html'
    ], function () {
        kwota.router.start();
    });
    
});