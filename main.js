var fieldCount = 1
var totalCredits = 0
var credits = [];
var grades = []
var totalCGPA = 0

jQuery.fn.ForceNumericOnly = function(){
    return this.each(function()
    {
        $(this).keydown(function(e)
        {
            var key = e.charCode || e.keyCode || 0;
            // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
            // home, end, period, and numpad decimal
            return (
                key == 8 || 
                key == 9 ||
                key == 13 ||
                key == 46 ||
                key == 110 ||
                key == 190 ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
        });
    });
};

$(document).ready(function(){
    $(".warning").hide()
    $(".cgpa").hide()
    $(".gpaval").hide()
    $(".CGPAlabel").hide()
    $("#cgpaTillLastSem").ForceNumericOnly()
    $("#creditsTillLastSem").ForceNumericOnly()
    $("#cgpaThisSem").ForceNumericOnly()
    $("#creditsThisSem").ForceNumericOnly()
    $(".add").click(function(){
        fieldCount = fieldCount + 1;
        var subjectFields = '<div class="row"><div class="six columns"><label for="credits">Credits</label><select class="u-full-width field" id="credits'+fieldCount+'"><option hidden>Select credits</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></div><div class="six columns"><label for="grade">Grade</label><select class="u-full-width field" id="grade'+fieldCount+'"><option hidden>Select a grade</option><option value="10">S</option><option value="9">A</option><option value="8">B</option><option value="7">C</option><option value="6">D</option><option value="5">E</option><option value="0">F</option><option value="0">N</option></select></div></div>'
        $(".subject").append(subjectFields);
    });

    $(".subject").on('change', '.field', function() {
        var id = this.id
        refreshGPA(id)
    });

    $("#GPA").click(function(){
        $(".gpaval").hide()
        $(".cgpa").hide()
        $(".gpa").show()
        $("#CGPA").removeClass('active')
        $("#CGPA").parent().removeClass('selected')
        $("#GPA").addClass('active')
        $("#GPA").parent().addClass('selected')

    })

    $("#CGPA").click(function(){
        $(".gpaval").hide()
        $(".gpa").hide()
        $(".cgpa").show()
        $("#GPA").removeClass('active')
        $("#GPA").parent().removeClass('selected')
        $("#CGPA").addClass('active')
        $("#CGPA").parent().addClass('selected')

    })
    
    var totalCGPAhere = 0
    $(".textfield").on('propertychange change keyup paste input', function(){
        $('label[for='+this.id+']').show();
        console.log(this.id)
        if ($("#"+this.id).val() == ""){
            $('label[for='+this.id+']').hide()
        }
        var cgpaTLS = parseFloat($("#cgpaTillLastSem").val())
        var credsTLS = parseInt($("#creditsTillLastSem").val())
        var cgpaTS = parseFloat($("#cgpaThisSem").val())
        var credsTS = parseInt($("#creditsThisSem").val())
        if (cgpaTLS == "" ||credsTLS == "" || cgpaTS == "" || credsTS == ""){
            $(".gpaval").hide()
        }
        else if (cgpaTLS > 10){
            $(".cgpa1").show()
            $(".gpaval").hide()
        }
        else if (cgpaTS > 10){
            $(".cgpa2").show()
            $(".gpaval").hide()
        }
        else if (credsTLS > 200){
            $(".creds1").show()
            $(".gpaval").hide()
        }
        else if (credsTS > 27){
            $(".creds2").show()
            $(".gpaval").hide()
        }
        else {
            $(".warning").hide()
            $(".gpaval").hide()
            console.log(totalCGPA)
            totalCGPAhere = ((cgpaTLS*credsTLS)+(cgpaTS*credsTS))/(credsTLS+credsTS)
            totalCGPAhere = totalCGPAhere.toFixed(2);
            if (totalCGPAhere > 0){
                $(".sgpa").html(totalCGPAhere + '<span class="small">/10</span>')
                $(".gpaval").show()
            }
        }
       

    });
    
});

function add(a, b) {
    return a + b;
}


function refreshGPA(id){
    var index = parseInt(id.substr(-1))
    var what = /(credits|grade)/.exec(id);
    console.log(id)
    if(what[0] == 'credits'){
        credits[index-1] = parseInt($(event.target).val())
        console.log($(event.target).val())
        totalCredits = credits.reduce(add, 0);
    }
    else if(what[0]=='grade'){
        grades[index-1] = parseInt($(event.target).val())
        console.log($(event.target).val())
    }
    if (credits.length == grades.length){
        var totalmarks = 0
        for (i = 0; i < grades.length; i++) { 
            totalmarks += credits[i]*grades[i]
            console.log(totalmarks)
            console.log(totalCredits)
            }
        totalCGPA = totalmarks/totalCredits
        totalCGPA = totalCGPA.toFixed(2);
        console.log(totalCGPA)
        $(".sgpa").html(totalCGPA + '<span class="small">/10</span>')
        $(".gpaval").show()
    }
}