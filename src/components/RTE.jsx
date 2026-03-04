import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import { data } from "react-router-dom";

export default function RTE({
  name = "content",
  control,
  label,
  defaultValue = "",
}) {
  
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1 text-lg">{label}</label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Editor
            apiKey="otj7ud66nv6wb5paxr2kaqg6n5qmgpv3o0thguo03xv9odhb"
            value={field.value}
            onEditorChange={field.onChange}
            init={{
              height: 500,
              menubar: true,
              inline: false,   
              plugins: [
                  'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                    'code'
              ],
              toolbar:
               'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | image | alignleft aligncenter bold italic forecolor | checklist numlist bullist indent outdent  | removeformat',
            }}
          />
        )}
      />
    </div>
  );
}



















// import React from "react";
// import {Editor} from '@tinymce/tinymce-react'
// import {Controller} from 'react-hook-form'

// export default function RTE({name,control,label,defaultValue=""})
// {
//    return(<div className="w-full">
//      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

//     <Controller name={name || "content"}
//       control={control} 
//       render={({field:{onChange}})=>(
//         <Editor 
//                 initialValue={defaultValue}
//                 key="rte-editor"
//                 apiKey="otj7ud66nv6wb5paxr2kaqg6n5qmgpv3o0thguo03xv9odhb"
//                 init={{
//                 height:500,
//                 menubar:true,
//                 plugins:[
//                      'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
//                      'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen',
//                 ],
//                 toolbar:
//                 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
//                 content_style:"body {font-family:Helvetica,Arial,sans-serif; font-size:14px}"
            
//                }}
//                onEditorChange={onChange}
//                >
   

//         </Editor>
//       )}>
   
//     </Controller>


//    </div>)
//  }