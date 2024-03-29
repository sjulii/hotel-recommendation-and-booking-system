const bcrypt = require("bcrypt");
const mongoose=require('mongoose')

const {Schema}=mongoose

const userSchema=new Schema(
    {
        name:{
            type:String,
            trim:true,
            required:"Name is required",

        },
        email:{
            type:String,
            trim:true,
            required:"Email is required",
            unique:true

            
        },
        password:{

            type:String,
            trim:true,
            required:"password is required",

        },
        phone:{

            type:Number,
            trim:true,
            

        },
        address:{

            type:String,
            trim:true,
            

        },

        isSeller:{
            type:Boolean,
            default:false,
        },
        
        stripe_account_id:'',
        stripe_seller:{},
        stripeSession:{},
    },{timestamps:true}
)



userSchema.pre("save",function(next){
    let user=this;
    if(user.isModified('password')){
        return bcrypt.hash(user.password,8,function(err,hash){
            if(err){
                console.log('BCRYPT HASH ERR',err);
                return next(err)
            }
            user.password=hash;
            return next()
        })
    }
    else{
        return next();
    }
})


userSchema.methods.comparePassword=function(password,next){
    bcrypt.compare(password,this.password,function(err,match){
        if(err){
            console.log("compare password err",err)
            return next(err,false)
        }

        console.log("match paasword",match)
        return next(null,match)
    })
}




module.exports=mongoose.model("User",userSchema)