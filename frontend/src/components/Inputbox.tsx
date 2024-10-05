// interface Inputbox{
//   placeholder :string,
//   name : string,
// }

export const Inputbox =  () => {
  return <>
        <div className="justify-left items-center w-full">
            <label  className="block mb-2 text-sm font-medium text-gray-900">First name</label>
            <input type="text" id="first_name" className="max-w-sm  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John" required />
        </div>
        
  </>
}