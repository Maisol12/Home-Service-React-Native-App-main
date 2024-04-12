import { request, gql } from 'graphql-request'

const MASTER_URL="https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clt1czvql18bi08vwf1i3xps8/master"

const getSlider=async()=>{
    const query = gql`
    query GetSlider {
        sliders {
          id
          name
          image {
            url
          }
        }
      }
      
  `
 const result= await request(MASTER_URL, query);
 return result;
}


const getCategories=async()=>{
    const query=gql`
    query GetCategory {
        categories {
          id
          name
          icon {
            url
          }
        }
      }
      `

      const result= await request(MASTER_URL, query);
      return result;
}

const getBusinessList=async()=>{
  const query=gql`
  query getBusinessList {
    businessLists {
      id
      name
      email
      rating
      contactPerson
      category {
        name
      }
      address
      about
      images {
        url
      }
    }
  }
  `
  const result= await request(MASTER_URL, query);
  return result;
}

const getBusinessListByCategory=async(category)=>{
  const query=gql`
  query getBusinessList {
    businessLists(where: {category: {name: "`+category+`"}}) {
      id
      name
      email
      rating
      category {
        name
      }
      address
      contactPerson
      about
      images {
        url
      }
    }
  }
  `
  const result= await request(MASTER_URL, query);
  return result;
}

const createBooking=async(data)=>{
  const mutationQuery=gql`
  mutation createBooking {
    createBooking(
      data: {
        bookingStatus: Booked, 
        businesslist: {
          connect: {id: "`+data.businessId+`"},
        }, 
        date: "`+data.date+`", 
        time: "`+data.time+`", 
        userEmail: "`+data.userEmail+`", 
        userName: "`+data.userName+`"},

    ) {
      id
    }
    publishManyBookings(to: PUBLISHED) {
      count
    }
  }
  `
  const result= await request(MASTER_URL, mutationQuery);
  return result;
}

const getUserBookings=async(userEmail)=>{
  console.log(userEmail)
  const query=gql`
  query GetUserBookings {
    bookings(orderBy: updatedAt_DESC, 
      where: {userEmail: "`+userEmail+`"}) {
      time
      userEmail
      userName
      bookingStatus
      date
      id
      businesslist {
        id
        contactPerson

        images {
          url
        }
        name
        address
        
        email
        about
        category {
          name
        }
      }
    }
  }
  `

  const result= await request(MASTER_URL, query);
  console.log('hola bebas \n', result);
  return result;


}

export default{
    getSlider,
    getCategories,
    getBusinessList,
    getBusinessListByCategory,
    createBooking,
    getUserBookings
}
