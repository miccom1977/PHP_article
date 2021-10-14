function loadArticles(){
    var that = $(this);
    $.ajax({
        type     : "GET",
        dataType : "json",
        url      : "read_all.php",
        beforeSend: function() {
            that.data('inprogress', 1);
            $('body').css('cursor', 'progress');
        },
    }).done(function( data ) {
        that.data('inprogress', 0);
        $('body').css('cursor', 'auto');
        if (data.error)
        {
            alert(data.error);
        }
        else
        {
            $('#articleData').html(data.data);
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        that.data('inprogress', 0);
        $('body').css('cursor', 'auto');
        alert(textStatus);
    });
}

$(document).ready(function() {
    loadArticles();

    $('body').on('click', '#createAddForm', function() {
        $('#articleData').html('<input type="text" id="title" placeholder="your title"/><br><input type="text" id="description" placeholder="your description"/><br><input type="number" id="status" placeholder="your status"/><br><button id="addArticle" class="btn btn-success">Add Article</button>');
    });

    $('body').on('click', '#addArticle', function() {
        var that = $(this);
        $.ajax({
            type     : "POST",
            dataType : "json",
            url      : "create.php",
            data     : {
                'title':$("#title").val(),
                'description':$("#description").val(),
                'status':$("#status").val()
            },
            beforeSend: function() {
                that.data('inprogress', 1);
                $('body').css('cursor', 'progress');
            },
        }).done(function( data ) {
            that.data('inprogress', 0);
            $('body').css('cursor', 'auto');
            if (data.error){
                $('#errors').html(data.error);
            }else{
                $('#infos').html(data.info);
                $('#errors').html('');
                loadArticles();
            }
        }).fail(function(textStatus) {
            that.data('inprogress', 0);
            $('body').css('cursor', 'auto');
            alert(textStatus);
        });
    });


    $('body').on('click', '.editArticle', function() {
        var that = $(this);
        $.ajax({
            type     : "GET",
            dataType : "json",
            url      : "single_read.php",
            data     : {
                'id':$(this).attr('var'),
            },
            beforeSend: function() {
                that.data('inprogress', 1);
                $('body').css('cursor', 'progress');
            },
        }).done(function( data ) {
            that.data('inprogress', 0);
            $('body').css('cursor', 'auto');
            if (data.error){
                $('#errors').html(data.error);
            }else{
                $('#articleData').html('<input type="text" id="title" value="'+data.title+'"/><br><input type="text" id="description" value="'+data.description+'"/><br><input type="number" id="status" value="'+data.status+'"/><br><button id="saveArticle" var="'+data.id+'" class="btn btn-success">Save Article</button>');
            }
        }).fail(function(textStatus) {
            that.data('inprogress', 0);
            $('body').css('cursor', 'auto');
            alert(textStatus);
        });
    });

    $('body').on('click', '#saveArticle', function() {
        var that = $(this);
        $.ajax({
            type     : "POST",
            dataType : "json",
            url      : "update.php",
            data     : {
                'id':$(this).attr('var'),
                'title':$("#title").val(),
                'description':$("#description").val(),
                'status':$("#status").val()
            },
            beforeSend: function() {
                that.data('inprogress', 1);
                $('body').css('cursor', 'progress');
            },
        }).done(function( data ) {
            that.data('inprogress', 0);
            $('body').css('cursor', 'auto');
            if (data.error){
                $('#errors').html(data.error);
            }else{
                $('#infos').html(data.info);
                $('#errors').html('');
                loadArticles();
            }
        }).fail(function(textStatus) {
            that.data('inprogress', 0);
            $('body').css('cursor', 'auto');
            alert(textStatus);
        });
    });

    $('body').on('click', '.deleteArticle', function() {
        if (confirm('Are you sure you want to delete this?')) {
            var that = $(this);
            $.ajax({
                type     : "POST",
                dataType : "json",
                url      : "delete.php",
                data     : {
                    'id':$(this).attr('var')
                },
                beforeSend: function() {
                    that.data('inprogress', 1);
                    $('body').css('cursor', 'progress');
                },
            }).done(function( data ) {
                that.data('inprogress', 0);
                $('body').css('cursor', 'auto');
                if (data.error){
                    $('#errors').html(data.error);
                }else{
                    $('#infos').html(data.info);
                    $('#errors').html('');
                    loadArticles();
                }
            }).fail(function(textStatus) {
                that.data('inprogress', 0);
                $('body').css('cursor', 'auto');
                alert(textStatus);
            });
        }
    });

/*
    var dataURL = {};
    $('body').on('click', '#endGame', function() {
        // dodajemy do renderowanego zdjęcia diwy z informacjami :)
        var lines = parseInt($("#lineCanvas").html());
        var username = $("#usernameCanvas").html();
        $("#grille").append('<div id="canvasInfo">Na tym diagramie znajduje się narysowanych linii: <strong>'+lines+'</strong>.<br> Gratulujemy! Graczowi <strong>'+username.toString()+'</strong>.<br> Zapraszamy do gry online www.kakus-online.pl</div>');
        //get the div content
            div_content = document.querySelector("#grille");
            //make it as html5 canvas
            html2canvas(div_content,{
                width: 450,
                height: 450,
                scale:1,
                x:550,
                y:220,
            }).then(function(canvas) {
                //change the canvas to jpeg image
                data = canvas.toDataURL('image/jpeg');
                //then call a super hero php to save the image
                save_img(data);
            });
            
    });
    
    if($.session.get('actualGrille')){
        loadGrille($.session.get('actualGrille'));
    }else{
        loadGrille();
    }
$('body').on('click', '.sGrille', function() {
    $(this).toggleClass('checked');
});

$('body').on('click', '#newGame', function() {
    newGrille();
});

$('body').on('click', '#clik', function() {
    var that = $(this);
    const tab = [];
    const tab2 = [];
    $( '#grille .checked' ).each(function( index ) {
        tab.push($( this ).attr('var'));
        tab2.push($( this ).attr('code'));
    });
    //console.log(tab);
    if( tab.length == 0 ){
        alert("Musisz zaznaczyć 5 punktów w linii prostej, punkty muszą sąsiadować ze sobą!");
    }else{
        $.ajax({
        type     : "POST",
        dataType : "json",
        url      : "draw",
        data     : {
            'tab':tab,
            'tab2':tab2,
            'gi':$('#endGame').attr('num')
        },
        beforeSend: function() {
            that.data('inprogress', 1);
            $('body').css('cursor', 'progress');
        },
        }).done(function( data ) {
            that.data('inprogress', 0);
            $('body').css('cursor', 'auto');
            if (data.info)
            {
                alert(data.info);
            }
            else
            {
                $('#userPoints').html(data.lineInt);
                $.session.set('actualGrille', data.actualGrille);
                console.log("AG="+$.session.get('actualGrille'));
                loadGrille(data.actualGrille);
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            that.data('inprogress', 0);
            $('body').css('cursor', 'auto');
            alert(textStatus);
        });
    }
    
});


$('body').on('click', '.loadGame', function() {
    var that = $(this);
    var num = that.attr('num');
        loadGrille(num);
});

$('body').on('click', '#endGame', function() {
    var that = $(this);
    var num = that.attr('num');
        $.ajax({
            type     : "GET",
            dataType : "json",
            url      : "endGame/"+num,
            beforeSend: function() {
                that.data('inprogress', 1);
                $('body').css('cursor', 'progress');
            },
        }).done(function( data ) {
            that.data('inprogress', 0);
            $('body').css('cursor', 'auto');
            if (data.error)
            {
                alert(data.error);
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            that.data('inprogress', 0);
            $('body').css('cursor', 'auto');
            alert(textStatus);
        });
});
*/
});