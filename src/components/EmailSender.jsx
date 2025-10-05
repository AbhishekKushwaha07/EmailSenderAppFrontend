import React, { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { sendEmail } from "../services/email.service";
import { Editor } from "@tinymce/tinymce-react";

function EmailSender() {
  const [EmailData, setEmailData] = useState({
    to: "",
    subject: "",
    message: "",
  });

  const [sending, setSending] = useState(false);

  const editorRef = useRef(null);

  function handelInputChange(event, name) {
    setEmailData({ ...EmailData, [name]: event.target.value });
  }

  async function handelSubmit(event) {
    event.preventDefault();

    if (
      EmailData.to == "" ||
      EmailData.subject == "" ||
      EmailData.message == ""
    ) {
      toast.error("SomeThing missing in your feild");
      return;
    }

    try {
      setSending(true);
      await sendEmail(EmailData);
      toast.success("Email sent sucessfully !!");
      toast.success("send another one.....");
      setEmailData({
        to: "",
        subject: "",
        message: "",
      });
      editorRef.current.setContent("");
    } catch (error) {
      toast.error("email not sent");
      console.log(error);
    } finally {
      setSending(false);
    }

    console.log(EmailData);
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center dark:bg-gray-900">
      <div className="">
        <i className="fa-regular fa-moon"></i>
      </div>
      <Toaster></Toaster>
      <div className="email_card md:w-1/2 w-full mx-4 md:mx-0 p-4 rounded-lg  shadow-2xl border-t-5 border-t-blue-500 dark:bg-gray-950 bg-gray-100">
        <h1 className="text-gray-800 text-3xl dark:text-white">Email Sender</h1>
        <p className="text-gray-600 dark:text-white">
          Send Email to your favorite person with your won app...
        </p>
        <form action="" onSubmit={handelSubmit}>
          {/*To */}
          <div className="input_feild mt-5">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                value={EmailData.to}
                onChange={(event) => handelInputChange(event, "to")}
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter recipient’s email address
              </label>
            </div>
          </div>

          {/* subject */}
          <div className="subject_feild mt-5">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                value={EmailData.subject}
                onChange={(event) => handelInputChange(event, "subject")}
                id="floating_first_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Subject of Email
              </label>
            </div>
          </div>

          {/* htmlFor body */}
          <div className="body_feild mt-5">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your message
            </label>
            {/* <textarea
              id="message"
              value={EmailData.message}
              onChange={(event) => handelInputChange(event, "message")}
              rows="8"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea> */}

            <Editor
              onEditorChange={(event) => {
                setEmailData({
                  ...EmailData,
                  message: editorRef.current.getContent(),
                });
              }}
              onInit={(evt, editor) => {
                editorRef.current = editor;
              }}
              apiKey={import.meta.env.VITE_SECRET}
              init={{
                plugins: [
                  // Core editing features
                  "anchor",
                  "autolink",
                  "charmap",
                  "codesample",
                  "emoticons",
                  "link",
                  "lists",
                  "media",
                  "searchreplace",
                  "table",
                  "visualblocks",
                  "wordcount",
                  // Your account includes a free trial of TinyMCE premium features
                  // Try the most popular premium features until Oct 18, 2025:
                  "checklist",
                  "mediaembed",
                  "casechange",
                  "formatpainter",
                  "pageembed",
                  "a11ychecker",
                  "tinymcespellchecker",
                  "permanentpen",
                  "powerpaste",
                  "advtable",
                  "advcode",
                  "advtemplate",
                  "ai",
                  "uploadcare",
                  "mentions",
                  "tinycomments",
                  "tableofcontents",
                  "footnotes",
                  "mergetags",
                  "autocorrect",
                  "typography",
                  "inlinecss",
                  "markdown",
                  "importword",
                  "exportword",
                  "exportpdf",
                ],
                toolbar:
                  "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                tinycomments_mode: "embedded",
                tinycomments_author: "Author name",
                mergetags_list: [
                  { value: "First.Name", title: "First Name" },
                  { value: "Email", title: "Email" },
                ],
                ai_request: (request, respondWith) =>
                  respondWith.string(() =>
                    Promise.reject("See docs to implement AI Assistant")
                  ),
                uploadcare_public_key: import.meta.env.VITE_SECRETPUBLIC,
              }}
              initialValue="Welcome to email send !"
            />
          </div>

          {/* loader */}
          {sending && (
            <div className="mt-5 flex flex-col justify-center items-center gap-2">
              <div role="status">
                <svg
                  aria-hidden="true"
                  class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
              <h1>sending email....</h1>
            </div>
          )}

          {/* buttons */}
          <div className="button-container flex justify-center mt-4">
            <button
              disabled={sending}
              type="submit"
              className=" relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500  group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Send email
              </span>
            </button>

            <button
              type="reset"
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Clear
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default EmailSender;
