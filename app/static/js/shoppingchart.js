
                                    var $add = document.getElementById('add');
                                    var $num = document.getElementById('num');
                                    var $sub = document.getElementById('sub');
                                    var count = $num.value;
                                    console.log(count);
                                    $num.on
                                    $add.onclick = function(){
                                        count = $num.value;
                                        count++;
                                        $num.value = count;
                                        console.log(count);
                                        console.log($num.value);
                                    }
                                    $sub.onclick = function(){
                                        count = $num.value;
                                        count--;
                                        console.log(count);

                                        if(count <= 1){
                                            count = 1;
                                        }
                                        $num.value = count;
                                    }
var                                     
                      