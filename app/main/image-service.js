/**
 * Created by emonidi on 12/30/15.
 */
angular.module('main')
    .service('imageService',[function(){
        return{
            cats:[
                'http://templates-and-themes.info/wp-content/uploads/Cute-cat-2.jpg',
                'http://files.dogster.com/pix/articles/ad999514bac32f2cf2a99c97d8ce3b8d_1272401874.jpg',
                'http://www.catbehaviorassociates.com/wp-content/uploads/2012/10/iStock_000000177340XSmall.jpg',
                'http://criticalcaredvm.com/wp-content/uploads/2015/09/indoor-vs-outdoor-cats-21235260.jpg',
                'http://files.dogster.com/pix/articles/bfdcdc91b3dad747f0f50447f6951175_1272398449.jpg',
                'http://files.dogster.com/pix/articles/4b7012270219daffde77cda861beb83e_1272398080.jpg',
                'http://www.guardianvetcentre.com/images/image/urinary-blockage-cat.jpg',
                'http://cdn1.theodysseyonline.com/files/2015/11/13/6358302318413127582026168541_ChristmasSantaHatCat.png'
            ]
        }
    }]);