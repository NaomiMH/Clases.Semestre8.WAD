var input_Number = document.getElementsByClassName("inputNumber");
var btn_Reset = document.getElementsByClassName("resetButton");
var btn_Equal = document.getElementsByClassName("equalButton");
var btn_Add = document.getElementsByClassName("addButton");
var btn_Sub = document.getElementsByClassName("substractButton");
var btn_Mult = document.getElementsByClassName("multiplicationButton");
var btn_Div = document.getElementsByClassName("divisionButton");
var input_Res = document.getElementsByClassName("resultValue");
var txt_Log = document.getElementsByClassName("logInformation");

var val1=0;
var primero=true;
var op='';

window.onload = function()
{
  btn_Reset[0].addEventListener('click', function(){
    input_Number[0].value = '0';
    txt_Log[0].value = "Reset\n";
    input_Res[0].value = '';
    op='';
    primero=true;
  });
  btn_Equal[0].addEventListener('click', function(){
    console.log(val1);
    console.log(op);
    if(op=='+')
      val1+=Number(input_Number[0].value);
    else if(op=='-')
      val1-=Number(input_Number[0].value);
    else if(op=='*')
      val1*=Number(input_Number[0].value);
    else if(op=='/')
      val1/=Number(input_Number[0].value);
    txt_Log[0].value += input_Number[0].value + '=' + val1 + '\n';
    input_Res[0].value = val1;
    input_Number[0].value = '0';
    val1 = 0;
    op='';
    primero=true;
    console.log(val1);
    console.log(op);
  });
  btn_Add[0].addEventListener('click', function(){
    console.log(val1);
    console.log(op);
    txt_Log[0].value += input_Number[0].value + '+';
    if(primero)
      val1=Number(input_Number[0].value);
    else{
      if(op=='+')
        val1+=Number(input_Number[0].value);
      else if(op=='-')
        val1-=Number(input_Number[0].value);
      else if(op=='*')
        val1*=Number(input_Number[0].value);
      else if(op=='/')
        val1/=Number(input_Number[0].value);
    }
    input_Number[0].value = '0';
    op='+';
    primero=false;
    console.log(val1);
    console.log(op);
  });
  btn_Sub[0].addEventListener('click', function(){
    console.log(val1);
    console.log(op);
    txt_Log[0].value += input_Number[0].value + '-';
    if(primero)
      val1=Number(input_Number[0].value);
    else{
      if(op=='+')
        val1+=Number(input_Number[0].value);
      else if(op=='-')
        val1-=Number(input_Number[0].value);
      else if(op=='*')
        val1*=Number(input_Number[0].value);
      else if(op=='/')
        val1/=Number(input_Number[0].value);
    }
    input_Number[0].value = '0';
    op='-';
    primero=false;
    console.log(val1);
    console.log(op);
  });
  btn_Mult[0].addEventListener('click', function(){
    txt_Log[0].value += input_Number[0].value + '*';
    if(primero)
      val1=Number(input_Number[0].value);
    else{
      if(op=='+')
        val1+=Number(input_Number[0].value);
      else if(op=='-')
        val1-=Number(input_Number[0].value);
      else if(op=='*')
        val1*=Number(input_Number[0].value);
      else if(op=='/')
        val1/=Number(input_Number[0].value);
    }
    input_Number[0].value = '0';
    op='*';
    primero=false;
  });
  btn_Div[0].addEventListener('click', function(){
    txt_Log[0].value += input_Number[0].value + '/';
    if(primero)
      val1=Number(input_Number[0].value);
    else{
      if(op=='+')
        val1+=Number(input_Number[0].value);
      else if(op=='-')
        val1-=Number(input_Number[0].value);
      else if(op=='*')
        val1*=Number(input_Number[0].value);
      else if(op=='/')
        val1/=Number(input_Number[0].value);
    }
    input_Number[0].value = '0';
    op='/';
    primero=false;
  });
}