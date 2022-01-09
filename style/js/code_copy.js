


code_tag_list=$('code')
// =$('code')[0].innerText




// $($('code')[0]).parent().append('<button style="background-color:red">copy</button>')

var clipJS=new ClipboardJS('.code_copy_btn');

for(let i=0; i<$('code').length;i++){

    if ( ! $($('code')[i]).attr('class') ){

        $($('code')[i]).attr('id','code_'+i)
        // $($('code')[i]).attr('class','highlight')
        // style="style=background-color:red  "
        id='id=bnt_code_tag_'+i+'  '
        target="data-clipboard-target=\'#"+'code_'+i+'\' ' 
        $($('code')[i]).parent().append('<button class="code_copy_btn"  '+ target +id + '>copy</button>')
    

    }


}



